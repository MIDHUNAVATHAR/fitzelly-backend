import { GymResponseDTO } from "../dtos/GetAllGymsDTO";

export interface IRejectGymUseCase {
    execute(gymId: string, rejectionReason: string): Promise<GymResponseDTO>;
}
