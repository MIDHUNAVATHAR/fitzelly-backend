import { IGetGymByIdUseCase } from "../IUseCases/gym-profile/IGetGymByIdUseCase";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { GymMapper } from "../mapper/SuperAdminGymMapper";
import { GymResponseDTO } from "../dtos/superAd-gym-listing/GetAllGymsDTO";
import { NotFoundError } from "../errors/AppError";

export class GetGymByIdUseCase implements IGetGymByIdUseCase {
    constructor(
        private readonly _gymRepository: IGymRepository
    ) { }

    async execute(gymId: string): Promise<GymResponseDTO> {
        const gym = await this._gymRepository.findById(gymId);
        if (!gym) {
            throw new NotFoundError("Gym");
        }
        return GymMapper.toResponseDTO(gym);
    }
}