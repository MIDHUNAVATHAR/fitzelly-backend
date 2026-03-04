import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";

export class DeleteMembershipUseCase {
    constructor(private membershipRepository: IMembershipRepository) { }

    async execute(membershipId: string, gymId: string) {
        const membership = await this.membershipRepository.findById(membershipId);
        if (!membership || membership.gymId !== gymId) throw new Error("Membership not found.");

        return await this.membershipRepository.delete(membershipId);
    }
}
