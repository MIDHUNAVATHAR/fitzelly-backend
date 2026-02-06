import { GymProfileDTO } from "../dtos/GymProfileDTO"

export interface IUpdateGymLogoUseCase {
    execute(id: string, logoUrl: string): Promise<GymProfileDTO>
}