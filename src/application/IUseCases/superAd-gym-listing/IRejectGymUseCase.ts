import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";

export interface IRejectGymUseCase {
    execute(gymId: string, rejectionReason: string): Promise<GymResponseDTO>;
}
