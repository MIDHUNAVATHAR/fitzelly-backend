import { IGetTrainersUseCase } from "../../IUseCases/trainer/IGetTrainersUseCase";
import { TrainerRequestDTO, TrainerResponseDTO } from "../../dtos/TrainerDTO";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { TrainerMapper } from "../../mapper/TrainerMapper";

export class GetTrainersUseCase implements IGetTrainersUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(gymId: string, page: number, search?: string): Promise<{ trainers: TrainerResponseDTO[]; total: number; page: number; limit: number; }> {
        const limit = 10;
        const skip = (page - 1) * 10;

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