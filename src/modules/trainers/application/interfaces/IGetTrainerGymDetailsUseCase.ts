import { GymProfileDTO } from "../../../gyms/application/dtos/GymProfileDTO";

export interface IGetTrainerGymDetailsUseCase {
    execute(trainerId: string): Promise<GymProfileDTO>;
}
