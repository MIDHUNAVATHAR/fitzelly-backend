import { IGetTrainersUseCase } from "../../IUseCases/gym-trainer/IGetTrainersUseCase";
import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { TrainerMapper } from "../../mapper/TrainerMapper";

export class GetTrainersUseCase implements IGetTrainersUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(gymId: string, page: number, limit: number, search?: string): Promise<{ trainers: TrainerResponseDTO[]; total: number; page: number; limit: number; }> {

        const skip = (page - 1) * limit;

        const { trainers, total } = await this._trainerRepository.getTrainersByGymId(gymId, skip, limit, search);

        const trainerResponseDTOs = trainers.map(trainer => TrainerMapper.toTrainerResponseDTO(trainer));

        return {
            trainers: trainerResponseDTOs,
            total,
            page,
            limit
        }
    }
}