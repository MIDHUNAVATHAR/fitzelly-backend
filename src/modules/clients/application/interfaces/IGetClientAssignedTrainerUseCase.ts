import { TrainerResponseDTO } from "../../../trainers/application/dtos/TrainerDTO";

export interface IGetClientAssignedTrainerUseCase {
    execute(clientId: string, trainerId: string): Promise<TrainerResponseDTO>;
}