import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { ClientProfileWithMembershipResponseDTO } from "../../dtos/gym-client/ClientProfileWithMembershipDTO";
import { IGetClientProfileWithMembershipUseCase } from "../../IUseCases/client-profile/IGetClientProfileWithMembershipUseCase";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { ClientProfileMapper } from "../../mapper/ClientProfileMapper";




export class GetClientProfileWithMembershipUseCase implements IGetClientProfileWithMembershipUseCase {
    constructor(
        private clientRepository: IClientRepository,
        private membershipRepository: IMembershipRepository,
        private paymentRepository: IPaymentRepository
    ) { }

    async execute(clientId: string): Promise<ClientProfileWithMembershipResponseDTO> {
        const client = await this.clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundError("Client");
        }

        const membership = await this.membershipRepository.findLatestByClientId(clientId);

        let membershipData = null;
        if (membership) {

            /**
             * "If Plan Type = DAY_BASED -> Show daysLeft even if membership is expired"
            */
            const daysLeft = membership.planType === 'DAY_BASED' ? membership.daysLeft : null;

            let paymentStatus: 'PAID' | 'PARTIAL' | 'UNPAID' | null = null;
            let payments: { date: string, amount: number }[] = [];

            /**
             * fetch payments
             */
            const rawPayments = await this.paymentRepository.getPaymentsByMembershipId(membership.id);
            payments = rawPayments.map(p => ({
                date: p.paymentDate.toISOString(),
                amount: p.amount
            }));

            /**
             * determine payment status
             */
            const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
            if (totalPaid === 0) {
                paymentStatus = 'UNPAID';
            } else if (totalPaid < membership.planAmount) {
                paymentStatus = 'PARTIAL';
            } else {
                paymentStatus = 'PAID';
            }

            membershipData = {
                currentPlan: membership.planName,
                planType: membership.planType,
                startDate: membership.startDate.toISOString(), // formatting as string
                expiryDate: membership.expiryDate ? membership.expiryDate.toISOString() : null,
                status: membership.status,
                daysLeft: daysLeft,
                assignedTrainer: membership.assignedTrainerName,
                assignedTrainerId: membership.assignedTrainerId,
                paymentStatus,
                payments
            };
        }

        const profileDTO = ClientProfileMapper.toDTO(client);

        return {
            profile: {
                ...profileDTO,

                emergencyContact: client.emergencyContact || null
            },
            membership: membershipData
        };
    }
}
