import { TrainerResponseDTO, UpdateTrainerRequestDTO } from "../../dtos/gym-trainer/TrainerDTO";

export interface IUpdateTrainerUseCase {
    execute(trainerId: string, gymId: string, data: UpdateTrainerRequestDTO): Promise<TrainerResponseDTO>;
}