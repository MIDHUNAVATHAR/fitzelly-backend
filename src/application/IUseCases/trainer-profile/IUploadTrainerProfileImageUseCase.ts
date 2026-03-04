import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";

export interface IUploadTrainerProfileImageUseCase {
    execute(trainerId: string, file: Express.Multer.File): Promise<TrainerResponseDTO>;
}
