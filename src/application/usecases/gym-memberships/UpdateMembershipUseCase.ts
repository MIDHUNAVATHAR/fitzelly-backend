import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { IUpdateMembershipUseCase } from "../../IUseCases/gym-memberships/IGymMembershipUseCases";
import {UpdateMembershipDTO} from "../../dtos/client-profile/ClientProfileDTO";



export class UpdateMembershipUseCase implements IUpdateMembershipUseCase {
    constructor(
        private _membershipRepository: IMembershipRepository,
        private _planRepository: IPlanRepository,
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(data: UpdateMembershipDTO) {
        const membership = await this._membershipRepository.findById(data.membershipId);
        if (!membership || membership.gymId !== data.gymId) throw new Error("Membership not found.");

        const updates: Record<string, unknown> = {};

        if (data.assignedTrainerId !== undefined) {
            if (data.assignedTrainerId) {
                const trainer = await this._trainerRepository.findById(data.assignedTrainerId);
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
            const plan = await this._planRepository.findById(membership.planId);
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

        return await this._membershipRepository.update(data.membershipId, updates);
    }
}
