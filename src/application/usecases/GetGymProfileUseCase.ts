import { GymProfileDTO } from "../dtos/GymProfileDTO";
import { IGetGymProfileUseCase } from "../IUseCases/IGetGymProfileUseCase";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { GymProfileMapper } from "../mappers/GymProfileMapper";
import { NotFoundError } from "../errors/AppError";


export class GetGymProfileUseCase implements IGetGymProfileUseCase {

    constructor(
        private _gymRepository: IGymRepository,
    ) { }

    async execute(id: string): Promise<GymProfileDTO> {
        const gym = await this._gymRepository.findById(id);
        if (!gym) {
            throw new NotFoundError("Gym")
        }
        return GymProfileMapper.toDTO(gym);
    }
}