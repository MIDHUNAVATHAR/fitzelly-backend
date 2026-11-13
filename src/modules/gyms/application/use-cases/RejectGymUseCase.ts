import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { IRejectGymUseCase } from "../interfaces/IRejectGymUseCase";
import { GymResponseDTO } from "../dtos/GetAllGymsDTO";
import { NotFoundError, AppError } from "../../../../shared/errors/AppError";
import { GymMapper } from "../dtos/SuperAdminGymMapper";

export class RejectGymUseCase implements IRejectGymUseCase {
    constructor(
        private _gymRepository: IGymRepository,
    ) { }

    async execute(gymId: string, rejectionReason: string): Promise<GymResponseDTO> {
        /**
         * fetch gym
         */
        const gym = await this._gymRepository.findById(gymId);
        if (!gym) {
            throw new NotFoundError("Gym");
        }

        /**
         * check the gym already approved
         */
        if (gym.approvalStatus === "Approved") {
            throw new AppError("Gym is already approved", 400); 
        }

        /**
         *  Update gym approvalStatus -> "Rejected" and rejectionReason
         */
        const updatedGym = await this._gymRepository.updateStatus(gymId, {
            approvalStatus: 'Rejected',
            rejectionReason: rejectionReason
        });

        return GymMapper.toResponseDTO(updatedGym);
    }
}
