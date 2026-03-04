import { GymResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO";

export interface IGetGymByIdUseCase {
    execute(gymId: string): Promise<GymResponseDTO>
}