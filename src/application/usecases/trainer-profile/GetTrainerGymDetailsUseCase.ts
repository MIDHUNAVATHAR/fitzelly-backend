import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO";
import { IGetTrainerGymDetailsUseCase } from "../../IUseCases/trainer-profile/IGetTrainerGymDetailsUseCase";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { GymProfileMapper } from "../../mapper/GymProfileMapper";

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
