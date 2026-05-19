import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { IDeleteMembershipUseCase } from "../../IUseCases/gym-memberships/IGymMembershipUseCases";

export class DeleteMembershipUseCase implements IDeleteMembershipUseCase {
    constructor(
        private _membershipRepository: IMembershipRepository,
        private _paymentRepository: IPaymentRepository
    ) { }

    async execute(membershipId: string, gymId: string) {
        const membership = await this._membershipRepository.findById(membershipId);
        if (!membership || membership.gymId !== gymId) throw new Error("Membership not found.");

        /**
         * soft delete all payments associated with this membership record
         */
        await this._paymentRepository.deleteManyByMembershipId(membership.id);

        return await this._membershipRepository.delete(membershipId);
    }
}

