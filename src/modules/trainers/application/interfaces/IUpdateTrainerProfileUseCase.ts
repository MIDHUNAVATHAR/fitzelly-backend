
import { TrainerResponseDTO } from "../dtos/TrainerDTO";
import { UpdateTrainerProfileDTO } from "../dtos/UpdateTrainerProfileDTO";

export interface IUpdateTrainerProfileUseCase {
    execute(trainerId: string, data: UpdateTrainerProfileDTO): Promise<TrainerResponseDTO>;
}
