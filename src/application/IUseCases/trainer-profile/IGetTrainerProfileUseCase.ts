import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";


export interface IGetTrainerProfileUseCase {
    execute(trainerId: string): Promise<TrainerResponseDTO>;
}
