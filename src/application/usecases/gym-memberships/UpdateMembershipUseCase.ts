import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";

export interface UpdateMembershipDTO {
    gymId: string;
    membershipId: string;
    startDate?: string;
    assignedTrainerId?: string;
    daysLeft?: number;
}

export class UpdateMembershipUseCase {
    constructor(
        private membershipRepository: IMembershipRepository,
        private planRepository: IPlanRepository,
        private trainerRepository: ITrainerRepository
    ) { }

    async execute(data: UpdateMembershipDTO) {
        const membership = await this.membershipRepository.findById(data.membershipId);
        if (!membership || membership.gymId !== data.gymId) throw new Error("Membership not found.");

        const updates: Record<string, unknown> = {};

        if (data.assignedTrainerId !== undefined) {
            if (data.assignedTrainerId) {
                const trainer = await this.trainerRepository.findById(data.assignedTrainerId);
                if (trainer && trainer.gymId === data.gymId) {
                    updates.assignedTrainerId = trainer.id;
                    updates.assignedTrainerName = trainer.fullName;
                } else {
                    updates.assignedTrainerId = null;
                    updates.assignedTrainerName = null;
                }
            } else {
                updates.assignedTrainerId = null;
                updates.assignedTrainerName = null;
            }
        }

        if (data.startDate !== undefined) {
            const startDate = new Date(data.startDate);
            updates.startDate = startDate;

            // Recalculate expiry date
            const plan = await this.planRepository.findById(membership.planId);
            if (!plan) throw new Error("Plan connected to this membership not found.");

            const expiryDate = new Date(startDate);
            if (plan.planType === 'CATEGORY_BASED') {
                expiryDate.setMonth(expiryDate.getMonth() + plan.validity);
            } else if (plan.planType === 'DAY_BASED') {
                expiryDate.setDate(expiryDate.getDate() + plan.windowPeriod);
            }
            updates.expiryDate = expiryDate;
        }

        if (data.daysLeft !== undefined && membership.planType === 'DAY_BASED') {
            updates.daysLeft = data.daysLeft;
        }

        return await this.membershipRepository.update(data.membershipId, updates);
    }
}
