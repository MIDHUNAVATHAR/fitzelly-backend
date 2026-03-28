import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { IS3Service, IS3UploadFile } from "../../../domain/services/IS3Service";
import { IUploadGymCertificateUseCase } from "../../IUseCases/gym-profile/IUploadGymCertificateUseCase";
import { Gym, IGymCertificate } from "../../../domain/entities/Gym";
import { NotFoundError } from "../../errors/AppError";

export class UploadGymCertificateUseCase implements IUploadGymCertificateUseCase {
    constructor(
        private _gymRepository: IGymRepository,
        private _s3Service: IS3Service
    ) { }

    async execute(gymId: string, file: IS3UploadFile, certificateName: string): Promise<Gym> {
        const gym = await this._gymRepository.findById(gymId);
        if (!gym) {
            throw new NotFoundError("Gym");
        }

        // Upload to S3 in the "gym-certificates" folder
        const url = await this._s3Service.uploadFile(file, "gym-certificates");
        
        // Extract key from URL for future deletion
        const key = url.split(".amazonaws.com/")[1];

        const newCertificate: IGymCertificate = {
            url,
            name: certificateName,
            type: file.mimetype.includes("pdf") ? "PDF" : "IMAGE",
            key
        };

        const updatedCertificates = [...(gym.certificates || []), newCertificate];

        
        return await this._gymRepository.updateCertificates(gymId, updatedCertificates);
    }
}
