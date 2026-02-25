import { TrainerResponseDTO } from "../../dtos/TrainerDTO";

export interface IGetTrainersUseCase {
    execute(gymId: string, page: number, search?: string): Promise<{
        trainers: TrainerResponseDTO[],
        total: number;
        page: number;
        limit: number;
    }>
}