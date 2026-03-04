import { TrainerRepository } from "../../../infrastructure/repositories/TrainerRepository";
import { TrainerRequestDTO } from "../../dtos/gym-trainer/TrainerDTO";
import { ConflictError } from "../../errors/AppError";
import { IAddTrainerUseCase } from "../../IUseCases/gym-trainer/IAddTrainerUseCase";
import { TrainerMapper } from "../../mapper/TrainerMapper";

export class AddTrainerUseCase implements IAddTrainerUseCase {
    constructor(
        private _trainerRepository: TrainerRepository
    ) { }
    async execute(trainerData: TrainerRequestDTO): Promise<void> {

        const { email } = trainerData;

        const verifiedTrainer = await this._trainerRepository.findVerifiedByEmail(email);
        if (verifiedTrainer) {
            throw new ConflictError();
        }

        const trainer = TrainerMapper.toEntity(trainerData)
        await this._trainerRepository.create(trainer);
    }
}