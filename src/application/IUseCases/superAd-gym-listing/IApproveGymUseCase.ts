import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";

export interface IApproveGymUseCase {
    execute(gymId: string): Promise<GymResponseDTO>;
}
