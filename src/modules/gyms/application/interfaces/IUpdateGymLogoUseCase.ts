import { GymProfileDTO } from "../dtos/GymProfileDTO"

export interface IUpdateGymLogoUseCase {
    execute(id: string, file:Express.Multer.File): Promise<GymProfileDTO>
}