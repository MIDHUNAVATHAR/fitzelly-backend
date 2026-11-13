import { ITrainerRepository } from "../../domain/repositories/ITrainerRepository";
import { UpdateTrainerRequestDTO,TrainerResponseDTO } from "../dtos/TrainerDTO";
import { NotFoundError, BadRequestError } from "../../../../shared/errors/AppError";
import { IUpdateTrainerUseCase } from "../interfaces/IUpdateTrainerUseCase";
import { TrainerMapper } from "../dtos/TrainerMapper";
import { IS3Service } from "../../../../shared/services/IS3Service";
import { validateAge } from "../../../../shared/utils/validation.util";



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

        if (data.salary && Number(data.salary) <= 0) {
            throw new BadRequestError("Salary must be greater than 0");
        }

        if (data.dateOfBirth) {
            const ageValidation = validateAge(data.dateOfBirth);
            if (!ageValidation.isValid) {
                throw new BadRequestError(ageValidation.message);
            }
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

        const updatedTrainer = await this._trainerRepository.update(updatedTrainerData);

        return TrainerMapper.toTrainerResponseDTO(updatedTrainer);

    }
}