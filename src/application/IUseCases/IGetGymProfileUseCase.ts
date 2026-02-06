import { GymProfileDTO } from "../dtos/GymProfileDTO";

export interface IGetGymProfileUseCase {
    execute(id: string): Promise<GymProfileDTO>;
}