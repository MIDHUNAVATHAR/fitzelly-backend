import { ITrainerRepository } from "../../domain/repositories/ITrainerRepository";
import { IGymRepository } from "../../../gyms/domain/repositories/IGymRepository";
import { GymProfileDTO } from "../../../gyms/application/dtos/GymProfileDTO";
import { IGetTrainerGymDetailsUseCase } from "../interfaces/IGetTrainerGymDetailsUseCase";
import { NotFoundError } from "../../../../shared/errors/NotFoundError";
import { GymProfileMapper } from "../../../gyms/application/dtos/GymProfileMapper";

export class GetTrainerGymDetailsUseCase implements IGetTrainerGymDetailsUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository,
        private _gymRepository: IGymRepository
    ) { }

    async execute(trainerId: string): Promise<GymProfileDTO> {
        const trainer = await this._trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer");
        }

        if (!trainer.gymId) {
            throw new NotFoundError("Trainer Gym Mapping");
        }

        const gym = await this._gymRepository.findById(trainer.gymId);
        if (!gym) {
            throw new NotFoundError("Gym");
        }

        return GymProfileMapper.toDTO(gym);
    }
}
