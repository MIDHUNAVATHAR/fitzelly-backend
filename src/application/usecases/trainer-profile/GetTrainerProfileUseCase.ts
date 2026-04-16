import { IGetTrainerProfileUseCase } from "../../IUseCases/trainer-profile/IGetTrainerProfileUseCase";
import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { TrainerMapper } from "../../mapper/TrainerMapper";

export class GetTrainerProfileUseCase implements IGetTrainerProfileUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(trainerId: string): Promise<TrainerResponseDTO> {
        const trainer = await this._trainerRepository.findById(trainerId);

        if (!trainer || trainer.isDeleted) {
            throw new Error("Trainer not found");
        }

        return TrainerMapper.toTrainerResponseDTO(trainer);
    }
}
