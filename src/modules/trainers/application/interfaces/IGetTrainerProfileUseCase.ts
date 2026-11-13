import { TrainerResponseDTO } from "../dtos/TrainerDTO";

export interface IGetTrainerProfileUseCase {
    execute(trainerId: string): Promise<TrainerResponseDTO>;
}
