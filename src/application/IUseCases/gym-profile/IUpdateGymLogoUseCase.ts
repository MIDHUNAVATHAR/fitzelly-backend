import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO"

export interface IUpdateGymLogoUseCase {
    execute(id: string, file:Express.Multer.File): Promise<GymProfileDTO>
}