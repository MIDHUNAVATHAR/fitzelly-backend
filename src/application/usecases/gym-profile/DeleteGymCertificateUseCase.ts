import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { IS3Service } from "../../../domain/services/IS3Service";
import { IDeleteGymCertificateUseCase } from "../../IUseCases/gym-profile/IDeleteGymCertificateUseCase";
import { Gym } from "../../../domain/entities/Gym";
import { NotFoundError } from "../../errors/AppError";

export class DeleteGymCertificateUseCase implements IDeleteGymCertificateUseCase {
    constructor(
        private _gymRepository: IGymRepository,
        private _s3Service: IS3Service
    ) { }

    async execute(gymId: string, certificateKey: string): Promise<Gym> {
        const gym = await this._gymRepository.findById(gymId);
        if (!gym) {
            throw new NotFoundError("Gym");
        }

        const certificateToDelete = gym.certificates.find(cert => cert.key === certificateKey);
        if (!certificateToDelete) {
            throw new NotFoundError("Certificate");
        }

        // Delete from S3
        await this._s3Service.deleteFile(certificateToDelete.url);

        // Update Gym's certificates list
        const updatedCertificates = gym.certificates.filter(cert => cert.key !== certificateKey);

        return await this._gymRepository.updateCertificates(gymId, updatedCertificates);
    }
}
