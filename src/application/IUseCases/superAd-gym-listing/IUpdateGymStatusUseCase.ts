
import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";

export interface IUpdateGymStatusUseCase {
    execute(gymId: string): Promise<GymResponseDTO>
}