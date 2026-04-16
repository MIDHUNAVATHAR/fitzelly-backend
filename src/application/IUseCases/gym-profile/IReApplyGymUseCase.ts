import { Gym } from "../../../domain/entities/Gym";

export interface IReApplyGymUseCase {
    execute(gymId: string): Promise<Gym>;
}
