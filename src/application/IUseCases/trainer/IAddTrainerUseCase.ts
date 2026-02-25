import { TrainerRequestDTO } from "../../dtos/TrainerDTO";

export interface IAddTrainerUseCase {
    execute(trainerData: TrainerRequestDTO): Promise<void>
}