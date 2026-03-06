import { TrainerRepository } from "../../../infrastructure/repositories/TrainerRepository";
import { TrainerRequestDTO } from "../../dtos/gym-trainer/TrainerDTO";
import { ConflictError } from "../../errors/AppError";
import { IAddTrainerUseCase } from "../../IUseCases/gym-trainer/IAddTrainerUseCase";
import { TrainerMapper } from "../../mapper/TrainerMapper";
import { IS3Service } from "../../../domain/services/IS3Service";

export class AddTrainerUseCase implements IAddTrainerUseCase {
    constructor(
        private _trainerRepository: TrainerRepository,
        private _s3Service: IS3Service
    ) { }
    async execute(trainerData: TrainerRequestDTO): Promise<void> {

        const { email, certificateFiles } = trainerData;

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