import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { UpdateTrainerRequestDTO, TrainerResponseDTO } from "../../dtos/TrainerDTO";
import { NotFoundError,BadRequestError } from "../../errors/AppError";
import { IUpdateTrainerUseCase } from "../../IUseCases/trainer/IUpdateTrainerUseCase";
import { TrainerMapper } from "../../mapper/TrainerMapper";



export class UpdateTrainerUseCase implements IUpdateTrainerUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(trainerId: string, gymId: string, data: UpdateTrainerRequestDTO): Promise<TrainerResponseDTO> {
        const trainer = await this._trainerRepository.findById(trainerId);

        if (!trainer || trainer.gymId !== gymId || trainer.isDeleted) {
            throw new NotFoundError("Trainer not found");
        }

        if (data.email && data.email !== trainer.email) {
            if (trainer.isEmailVerified){
                throw new BadRequestError("Cannot update verified email address");
            }
        }

        const updatedTrainerData = TrainerMapper.updateEntity(trainer, data);

        const updatedTrainer = await this._trainerRepository.updateTrainer(updatedTrainerData);

        return TrainerMapper.toTrainerResponseDTO(updatedTrainer);


    }
}