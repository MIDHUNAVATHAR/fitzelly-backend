import { GymResponseDTO } from "../dtos/GetAllGymsDTO";

export interface IApproveGymUseCase {
    execute(gymId: string): Promise<GymResponseDTO>;
}
