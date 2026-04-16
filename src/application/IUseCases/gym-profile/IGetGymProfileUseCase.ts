import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO";

export interface IGetGymProfileUseCase {
    execute(id: string): Promise<GymProfileDTO>;
}