
import { UpdateTrainerProfileDTO } from "../../dtos/trainer-profile/UpdateTrainerProfileDTO";
import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";


export interface IUpdateTrainerProfileUseCase {
    execute(trainerId: string, data: UpdateTrainerProfileDTO): Promise<TrainerResponseDTO>;
}
