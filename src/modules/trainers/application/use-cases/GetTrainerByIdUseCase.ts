import { ITrainerRepository } from "../../domain/repositories/ITrainerRepository";
import { TrainerResponseDTO } from "../dtos/TrainerDTO";
import { NotFoundError } from "../../../../shared/errors/AppError";
import { IGetTrainerByIdUseCase } from "../interfaces/IGetTrainerByIdUseCase";
import { TrainerMapper } from "../dtos/TrainerMapper";


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