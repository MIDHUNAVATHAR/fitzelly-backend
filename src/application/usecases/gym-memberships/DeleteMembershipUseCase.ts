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
         * soft delete all payments associated with this membership record
         */
        await this.paymentRepository.deleteManyByMembershipId(membership.id);

        return await this.membershipRepository.delete(membershipId);
    }
}
