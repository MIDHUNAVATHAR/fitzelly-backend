
import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";
import { GymUpdateRequestDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";

export interface IUpdateGymStatusUseCase {
    execute(gymId: string, updateData: GymUpdateRequestDTO): Promise<GymResponseDTO>
}