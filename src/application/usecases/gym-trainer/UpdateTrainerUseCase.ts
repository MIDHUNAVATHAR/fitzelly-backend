import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { UpdateTrainerRequestDTO, TrainerResponseDTO } from "../../dtos/gym-trainer/TrainerDTO";
import { NotFoundError, BadRequestError } from "../../errors/AppError";
import { IUpdateTrainerUseCase } from "../../IUseCases/gym-trainer/IUpdateTrainerUseCase";
import { TrainerMapper } from "../../mapper/TrainerMapper";
import { IS3Service } from "../../../domain/services/IS3Service";



export class UpdateTrainerUseCase implements IUpdateTrainerUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository,
        private _s3Service: IS3Service
    ) { }

    async execute(trainerId: string, gymId: string, data: UpdateTrainerRequestDTO): Promise<TrainerResponseDTO> {
        const trainer = await this._trainerRepository.findById(trainerId);

        if (!trainer || trainer.gymId !== gymId || trainer.isDeleted) {
            throw new NotFoundError("Trainer not found");
        }

        if (data.email && data.email !== trainer.email) {
            if (trainer.isEmailVerified) {
                throw new BadRequestError("Cannot update verified email address");
            }
        }

        let existingCerts = data.certificates || [];
        if (data.newCertificateFiles && data.newCertificateFiles.length > 0) {
            const uploaded = await Promise.all(
                data.newCertificateFiles.map((file) => this._s3Service.uploadFile(file, `trainer-certificates/${gymId}`))
            );
            existingCerts = [...existingCerts, ...uploaded];
        }

        const updatePayload = {
            ...data,
            certificates: existingCerts
        };

        const updatedTrainerData = TrainerMapper.updateEntity(trainer, updatePayload);

        const updatedTrainer = await this._trainerRepository.updateTrainer(updatedTrainerData);

        return TrainerMapper.toTrainerResponseDTO(updatedTrainer);


    }
}