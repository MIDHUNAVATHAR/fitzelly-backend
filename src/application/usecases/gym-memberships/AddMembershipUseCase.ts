import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { Membership } from "../../../domain/entities/Membership";
import { ConflictError } from "../../errors/AppError";
import { IAddMembershipUseCase } from "../../IUseCases/gym-memberships/IGymMembershipUseCases";
import { AddMembershipDTO } from "../../dtos/gym-client/MembershipDTO";



export class AddMembershipUseCase implements IAddMembershipUseCase {
    constructor(
        private _membershipRepository: IMembershipRepository,
        private _planRepository: IPlanRepository,
        private _clientRepository: IClientRepository,
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(data: AddMembershipDTO) {
        const client = await this._clientRepository.findById(data.clientId);
        if (!client || client.gymId !== data.gymId) throw new Error("Client not found.");

        /**
         * check the client has any active memberships
         */
        const existingMembership = await this._membershipRepository.findLatestByClientId(data.clientId);
        if (existingMembership?.status == "ACTIVE") {
            throw new ConflictError("Unable to add . Old membership still active")
        }

        const plan = await this._planRepository.findById(data.planId);
        if (!plan || plan.gymId !== data.gymId) throw new Error("Plan not found.");

        let trainerName = null;
        if (data.assignedTrainerId) {
            const trainer = await this._trainerRepository.findById(data.assignedTrainerId);


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

        return await this._membershipRepository.create(membership);
    }
}
