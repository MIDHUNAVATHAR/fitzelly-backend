import { WorkoutPlanDTO } from "../dtos/WorkoutPlanDTO";

export interface IGetWorkoutPlanByClientIdUseCase {
    execute(clientId: string, trainerId?: string): Promise<WorkoutPlanDTO | null>;
}
