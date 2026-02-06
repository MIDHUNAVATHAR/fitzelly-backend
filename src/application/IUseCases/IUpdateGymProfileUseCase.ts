import { GymProfileDTO } from "../dtos/GymProfileDTO"

export interface IUpdateGymProfileUseCase {
    execute(id: string, gymData: GymProfileDTO): Promise<GymProfileDTO>;
}