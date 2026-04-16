import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO"

export interface IUpdateGymProfileUseCase {
    execute(id: string, gymData: GymProfileDTO): Promise<GymProfileDTO>;
}