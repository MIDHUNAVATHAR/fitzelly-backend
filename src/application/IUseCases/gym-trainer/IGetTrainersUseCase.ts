import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";

export interface IGetTrainersUseCase {
    execute(gymId: string, page: number, limit: number, search?: string): Promise<{
        trainers: TrainerResponseDTO[],
        total: number;
        page: number;
        limit: number;
    }>
}