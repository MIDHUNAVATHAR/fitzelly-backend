import { TrainerRepository } from "../../../infrastructure/repositories/TrainerRepository";
import { TrainerRequestDTO } from "../../dtos/gym-trainer/TrainerDTO";
import { ConflictError, BadRequestError } from "../../errors/AppError";
import { IAddTrainerUseCase } from "../../IUseCases/gym-trainer/IAddTrainerUseCase";
import { TrainerMapper } from "../../mapper/TrainerMapper";
import { IS3Service } from "../../../domain/services/IS3Service";
import { validateAge } from "../../utils/validation.util";

export class AddTrainerUseCase implements IAddTrainerUseCase {
    constructor(
        private _trainerRepository: TrainerRepository,
        private _s3Service: IS3Service
    ) { }
    async execute(trainerData: TrainerRequestDTO): Promise<void> {

        const { fullName, email, phoneNumber, specialization, salary, dateOfBirth, certificateFiles } = trainerData;

        if (!fullName?.trim()) throw new BadRequestError("Full name is required");
        if (!email?.trim()) throw new BadRequestError("Email is required");
        if (!phoneNumber?.trim()) throw new BadRequestError("Phone number is required");
        if (!specialization?.trim()) throw new BadRequestError("Specialization is required");
        if (!dateOfBirth) throw new BadRequestError("Date of birth is required");

        if (salary && Number(salary) <= 0) {
            throw new BadRequestError("Salary must be greater than 0");
        }

        if (dateOfBirth) {
            const ageValidation = validateAge(dateOfBirth);
            if (!ageValidation.isValid) {
                throw new BadRequestError(ageValidation.message);
            }
        }

        const verifiedTrainer = await this._trainerRepository.findVerifiedByEmail(email);
        if (verifiedTrainer) {
            throw new ConflictError("This email already verified");
        }

        let uploadedCertificates: string[] = [];
        if (certificateFiles && certificateFiles.length > 0) {
            uploadedCertificates = await Promise.all(
                certificateFiles.map((file) => this._s3Service.uploadFile(file, `trainer-certificates/${trainerData.gymId}`))
            );
        }

        const trainerToCreate = {
            ...trainerData,
            certificates: uploadedCertificates
        };

        const trainer = TrainerMapper.toEntity(trainerToCreate)
        await this._trainerRepository.create(trainer);
    }
}