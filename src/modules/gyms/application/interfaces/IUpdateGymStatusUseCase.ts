
import { GymResponseDTO } from "../dtos/GetAllGymsDTO";

export interface IUpdateGymStatusUseCase {
    execute(gymId: string): Promise<GymResponseDTO>
}