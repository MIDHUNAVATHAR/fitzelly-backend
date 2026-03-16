import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { IS3Service } from "../../../domain/services/IS3Service";
import { TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";
import { IUploadTrainerProfileImageUseCase } from "../../IUseCases/trainer-profile/IUploadTrainerProfileImageUseCase";
import { TrainerMapper } from "../../mapper/TrainerMapper";

export class UpdateTrainerProfileImageUseCase implements IUploadTrainerProfileImageUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository,
        private _s3Service: IS3Service
    ) { }

    async execute(trainerId: string, file: Express.Multer.File): Promise<TrainerResponseDTO> {
        const logoUrl = await this._s3Service.uploadFile(file);

        const trainer = await this._trainerRepository.findById(trainerId);
        const oldProfileUrl = trainer?.profileUrl;

        if (trainer) {
            const updatedTrainerEntity = Object.assign(Object.create(Object.getPrototypeOf(trainer)), trainer, {
                profileUrl: logoUrl
            });
            const updatedDoc = await this._trainerRepository.update(updatedTrainerEntity);

            if (updatedDoc && oldProfileUrl) {

                await this._s3Service.deleteFile(oldProfileUrl);

            }

            return TrainerMapper.toTrainerResponseDTO(updatedDoc);
        }
        throw new Error("Trainer not found");
    }
}
