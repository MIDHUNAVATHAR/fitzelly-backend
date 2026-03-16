import { GetClientResponseDTO } from "../../dtos/gym-client/ClientDTO";
import { IGetClientByIdUseCase } from "../../IUseCases/gym-client/IGetClientByIdUseCase";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { ClientMapper } from "../../mapper/ClientMapper";
import { NotFoundError } from "../../errors/AppError";

export class GetClientByIdUseCase implements IGetClientByIdUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _membershipRepository: IMembershipRepository,
        private _paymentRepository: IPaymentRepository
    ) { }

    async execute(clientId: string): Promise<GetClientResponseDTO> {
        const client = await this._clientRepository.findById(clientId);
        console.log(client)
        /**
         * removed client.gymId !== gymId : this usecase used in both gym and trainer 
         */
        if (!client || client.isDeleted) {



            throw new NotFoundError("Client not found");
        }

        /**
         * fetch latest memberships 
         */
        const membership = await this._membershipRepository.findLatestByClientId(clientId);

        let paymentStatus: "PAID" | "PARTIAL" | "UNPAID" | null = null
        let payments: { date: string, amount: number }[] = [];

        if (membership) {
            /**
             * fetch payments 
             */
            const rawPayments = await this._paymentRepository.getPaymentsByMembershipId(membership.id);
            payments = rawPayments.map(p => ({
                date: p.paymentDate.toISOString(),
                amount: p.amount
            }))

            /**
             * determine payment status
             */
            const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
            if (totalPaid === 0) {
                paymentStatus = "UNPAID";
            } else if (totalPaid < membership.planAmount) {
                paymentStatus = "PARTIAL";
            } else {
                paymentStatus = "PAID"
            }
        }

        return ClientMapper.toGetClientResponseDTO(client, membership ? {
            currentPlan: membership.planName,
            membershipStatus: membership.status,
            planType: membership.planType,
            daysLeft: membership.planType === 'DAY_BASED' ? membership.daysLeft : null,
            startDate: membership.startDate.toISOString(),
            expiryDate: membership.expiryDate?.toISOString() || null,
            assignedTrainer: membership.assignedTrainerName,
            paymentStatus,
            payments
        } : undefined);
    }
}