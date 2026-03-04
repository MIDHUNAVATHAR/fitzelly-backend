import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";

export interface IGetTrainerByIdUseCase {
    execute(trainerId: string, gymId: string): Promise<TrainerResponseDTO>;
}