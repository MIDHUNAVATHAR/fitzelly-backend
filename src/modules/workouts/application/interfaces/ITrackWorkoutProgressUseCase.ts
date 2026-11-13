import { WorkoutProgressDTO } from "../dtos/WorkoutPlanDTO";

export interface ITrackWorkoutProgressUseCase {
    execute(clientId: string, data: WorkoutProgressDTO): Promise<WorkoutProgressDTO>;
}
