import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { IReApplyGymUseCase } from "../../IUseCases/gym-profile/IReApplyGymUseCase";
import { Gym } from "../../../domain/entities/Gym";
import { AppError } from "../../errors/AppError";
import { AddNotificationUseCase } from "../notification/NotificationUseCases";
import { ROLES } from "../../../constants/roles.constants";

export class ReApplyGymUseCase implements IReApplyGymUseCase {
    constructor(
        private gymRepository: IGymRepository,
        private addNotificationUseCase: AddNotificationUseCase
    ) {}

    async execute(gymId: string): Promise<Gym> {
        const gym = await this.gymRepository.findById(gymId);
        if (!gym) {
            throw new AppError("Gym not found", 404);
        }

        if (gym.approvalStatus !== 'Rejected') {
            throw new AppError("Only rejected gyms can re-apply", 400);
        }

        // Check if profile is complete
        const isComplete = 
            gym.logoUrl && 
            gym.gymName && 
            gym.phoneNumber && 
            gym.address && 
            gym.description && 
            gym.location && 
            gym.location.latitude !== 0 && 
            gym.location.longitude !== 0 &&
            gym.certificates && 
            gym.certificates.length > 0;

        if (!isComplete) {
            throw new AppError("Profile is incomplete. Please fill all details before re-applying.", 400);
        }

        // Update status to Pending
        const updatedGym = await this.gymRepository.updateStatus(gymId, {
            approvalStatus: 'Pending',
            rejectionReason: '' // Clear rejection reason
        });

        // Add notification for super admin
        await this.addNotificationUseCase.execute(
            gymId,
            `Gym "${gym.gymName}" has re-applied for approval.`,
            'GYM_REAPPLIED',
            ROLES.SUPERADMIN
        );

        return updatedGym;
    }
}
