import { ITrainerRepository } from "../../domain/repositories/ITrainerRepository";
import { UpdateTrainerProfileDTO } from "../dtos/UpdateTrainerProfileDTO";
import { TrainerResponseDTO } from "../dtos/TrainerDTO";
import { IUpdateTrainerProfileUseCase } from "../interfaces/IUpdateTrainerProfileUseCase";
import { TrainerMapper } from "../dtos/TrainerMapper";
import { validateAge } from "../../../../shared/utils/validation.util";
import { BadRequestError } from "../../../../shared/errors/AppError";


export class UpdateTrainerProfileUseCase implements IUpdateTrainerProfileUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository
    ) { }

    async execute(trainerId: string, data: UpdateTrainerProfileDTO): Promise<TrainerResponseDTO> {
        const trainer = await this._trainerRepository.findById(trainerId);

        if (!trainer) {
            throw new Error("Trainer not found");
        }

        if (data.dateOfBirth) {
            const ageValidation = validateAge(data.dateOfBirth);
            if (!ageValidation.isValid) {
                throw new BadRequestError(ageValidation.message);
            }
        }

        const dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : trainer.dateOfBirth;

        const updatedTrainer = Object.assign(Object.create(Object.getPrototypeOf(trainer)), trainer, {
            fullName: data.fullName ?? trainer.fullName,
            phoneNumber: data.phoneNumber ?? trainer.phoneNumber,
            specialization: data.specialization ?? trainer.specialization,
            qualification: data.qualification ?? trainer.qualification,
            address: data.address ?? trainer.address,
            dateOfBirth
        });

        await this._trainerRepository.updateProfile(updatedTrainer);

        const finalTrainer = await this._trainerRepository.findById(trainerId);
        if (!finalTrainer) {
            throw new Error("Failed to retrieve updated trainer");
        }

        return TrainerMapper.toTrainerResponseDTO(finalTrainer);
    }
}
