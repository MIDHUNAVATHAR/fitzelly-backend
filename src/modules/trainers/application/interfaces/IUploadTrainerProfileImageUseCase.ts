import { TrainerResponseDTO } from "../dtos/TrainerDTO";

export interface IUploadTrainerProfileImageUseCase {
    execute(trainerId: string, file: Express.Multer.File): Promise<TrainerResponseDTO>;
}
