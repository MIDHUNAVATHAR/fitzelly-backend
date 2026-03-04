import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO"

export interface IUpdateGymLogoUseCase {
    execute(id: string, logoUrl: string): Promise<GymProfileDTO>
}