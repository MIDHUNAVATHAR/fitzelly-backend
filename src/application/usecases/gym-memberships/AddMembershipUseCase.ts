import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { Membership } from "../../../domain/entities/Membership";

export interface AddMembershipDTO {
    gymId: string;
    clientId: string;
    planId: string;
    startDate: string;
    assignedTrainerId?: string;
    daysLeft?: number;
}

export class AddMembershipUseCase {
    constructor(
        private membershipRepository: IMembershipRepository,
        private planRepository: IPlanRepository,
        private clientRepository: IClientRepository,
        private trainerRepository: ITrainerRepository
    ) { }

    async execute(data: AddMembershipDTO) {
        const client = await this.clientRepository.findById(data.clientId);
        if (!client || client.gymId !== data.gymId) throw new Error("Client not found.");

        const plan = await this.planRepository.findById(data.planId);
        if (!plan || plan.gymId !== data.gymId) throw new Error("Plan not found.");

        let trainerName = null;
        if (data.assignedTrainerId) {
            const trainer = await this.trainerRepository.findById(data.assignedTrainerId);
            if (trainer && trainer.gymId === data.gymId) {
                trainerName = trainer.fullName;
            } else {
                data.assignedTrainerId = undefined; // Nullify invalid trainer
            }
        }

        const startDate = new Date(data.startDate);
        let expiryDate: Date | null = null;
        let daysLeft: number | null = null;

        if (plan.planType === 'CATEGORY_BASED') {
            expiryDate = new Date(startDate);
            expiryDate.setMonth(expiryDate.getMonth() + plan.validity);
        } else if (plan.planType === 'DAY_BASED') {
            expiryDate = new Date(startDate);
            expiryDate.setDate(expiryDate.getDate() + plan.windowPeriod);
            daysLeft = data.daysLeft ?? plan.validity;
        }

        const membership = new Membership(
            '',
            client.id.toString(),
            client.fullName,
            data.gymId,
            plan.id.toString(),
            plan.planName,
            plan.price,
            plan.planType,
            startDate,
            expiryDate!,
            'ACTIVE',
            daysLeft,
            data.assignedTrainerId || null,
            trainerName,
            false
        );

        return await this.membershipRepository.create(membership);
    }
}
