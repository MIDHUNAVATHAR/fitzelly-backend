import { GymProfileDTO } from "../../dtos/gym-profile/GymProfileDTO";

export interface IGetTrainerGymDetailsUseCase {
    execute(trainerId: string): Promise<GymProfileDTO>;
}
