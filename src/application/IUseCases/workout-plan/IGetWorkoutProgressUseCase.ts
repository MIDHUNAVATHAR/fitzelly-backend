import { WorkoutProgressDTO } from "../../dtos/workout-plan/WorkoutPlanDTO";

export interface IGetWorkoutProgressUseCase {
    execute(clientId: string, date: string): Promise<WorkoutProgressDTO | null>;
}
