import { GymProfileDTO } from "../../../gyms/application/dtos/GymProfileDTO";

export interface IGetClientGymDetailsUseCase {
    execute(clientId: string): Promise<GymProfileDTO>;
}
