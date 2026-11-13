import { Gym } from "../../domain/entities/Gym";
import { IS3UploadFile } from "../../../../shared/services/IS3Service";

export interface IUploadGymCertificateUseCase {
    execute(gymId: string, file: IS3UploadFile, certificateName: string): Promise<Gym>;
}
