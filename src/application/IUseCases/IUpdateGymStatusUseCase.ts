
import { GymResponseDTO } from "../dtos/GetAllGymsDTO";
import { GymUpdateRequestDTO } from "../dtos/GetAllGymsDTO";

export interface IUpdateGymStatusUseCase {
    execute(gymId: string, updateData: GymUpdateRequestDTO): Promise<GymResponseDTO>
}