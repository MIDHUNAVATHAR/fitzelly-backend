import { WorkoutPlanDTO } from "../../dtos/workout-plan/WorkoutPlanDTO";

export interface IGetWorkoutPlanByClientIdUseCase {
    execute(clientId: string, trainerId?: string): Promise<WorkoutPlanDTO | null>;
}
