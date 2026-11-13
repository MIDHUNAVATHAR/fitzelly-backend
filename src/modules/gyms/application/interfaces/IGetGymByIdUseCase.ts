import { GymResponseDTO } from "../dtos/GetAllGymsDTO";

export interface IGetGymByIdUseCase {
    execute(gymId: string): Promise<GymResponseDTO>
}