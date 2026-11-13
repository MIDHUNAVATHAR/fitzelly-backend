import { WorkoutProgressDTO } from "../dtos/WorkoutPlanDTO";

export interface IGetWorkoutProgressUseCase {
    execute(clientId: string, date: string): Promise<WorkoutProgressDTO | null>;
}
