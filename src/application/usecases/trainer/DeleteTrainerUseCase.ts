import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { NotFoundError } from "../../errors/AppError";
import { IDeleteTrainerUseCase } from "../../IUseCases/trainer/IDeleteTrainerUseCase";



export class DeleteTrainerUseCase implements IDeleteTrainerUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(trainerId: string, gymId: string): Promise<void> {
        const trainer = await this._trainerRepository.findById(trainerId);

        if (!trainer || trainer.gymId !== gymId || trainer.isDeleted) {
            throw new NotFoundError("Trainer");
        }

        await this._trainerRepository.softDelete(trainerId); 
    }
}