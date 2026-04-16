import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";
import { NotFoundError } from "../../errors/AppError";
import { IGetTrainerByIdUseCase } from "../../IUseCases/gym-trainer/IGetTrainerByIdUseCase";
import { TrainerMapper } from "../../mapper/TrainerMapper";


export class GetTrainerByIdUseCase implements IGetTrainerByIdUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(trainerId: string, gymId: string): Promise<TrainerResponseDTO> {
        const trainer = await this._trainerRepository.findById(trainerId);

        if (!trainer || trainer.gymId !== gymId || trainer.isDeleted) {
            throw new NotFoundError("Trainer not found");
        }
        return TrainerMapper.toTrainerResponseDTO(trainer);
    }
}