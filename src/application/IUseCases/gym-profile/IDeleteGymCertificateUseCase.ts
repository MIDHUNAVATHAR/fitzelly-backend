import { Gym } from "../../../domain/entities/Gym";

export interface IDeleteGymCertificateUseCase {
    execute(gymId: string, certificateKey: string): Promise<Gym>;
}
