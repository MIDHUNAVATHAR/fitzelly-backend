import { TrainerResponseDTO } from "../../dtos/TrainerDTO";

export interface IGetTrainerByIdUseCase {
    execute(trainerId: string, gymId: string): Promise<TrainerResponseDTO>;
}