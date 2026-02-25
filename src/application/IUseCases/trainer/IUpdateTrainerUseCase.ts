import { TrainerResponseDTO, UpdateTrainerRequestDTO } from "../../dtos/TrainerDTO";

export interface IUpdateTrainerUseCase {
    execute(trainerId: string, gymId: string, data: UpdateTrainerRequestDTO): Promise<TrainerResponseDTO>;
}