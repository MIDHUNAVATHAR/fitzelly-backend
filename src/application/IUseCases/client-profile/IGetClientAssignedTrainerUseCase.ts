import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";

export interface IGetClientAssignedTrainerUseCase {
    execute(clientId: string, trainerId: string): Promise<TrainerResponseDTO>;
}