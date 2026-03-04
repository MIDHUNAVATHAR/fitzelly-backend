import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO";

export interface IGetClientGymDetailsUseCase {
    execute(clientId: string): Promise<GymProfileDTO>;
}