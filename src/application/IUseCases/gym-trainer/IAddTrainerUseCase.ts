import { TrainerRequestDTO } from "../../dtos/gym-trainer/TrainerDTO";

export interface IAddTrainerUseCase {
    execute(trainerData: TrainerRequestDTO): Promise<void>
}