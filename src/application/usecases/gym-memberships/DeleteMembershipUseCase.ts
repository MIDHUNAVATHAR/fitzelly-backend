import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";

export class DeleteMembershipUseCase {
    constructor(
        private membershipRepository: IMembershipRepository,
        private paymentRepository: IPaymentRepository
    ) { }

    async execute(membershipId: string, gymId: string) {
        const membership = await this.membershipRepository.findById(membershipId);
        if (!membership || membership.gymId !== gymId) throw new Error("Membership not found.");

        /**
         * take payments based on membership id and delete
         */
        const membershipPayments = await this.paymentRepository.getPaymentsByMembershipId(membership.id);
        for (const payment of membershipPayments) {
            await this.paymentRepository.delete(payment.id);
        }

        return await this.membershipRepository.delete(membershipId);
    }
}
