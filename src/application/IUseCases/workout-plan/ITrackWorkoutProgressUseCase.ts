import { WorkoutProgressDTO } from "../../dtos/workout-plan/WorkoutPlanDTO";

export interface ITrackWorkoutProgressUseCase {
    execute(clientId: string, data: WorkoutProgressDTO): Promise<WorkoutProgressDTO>;
}
