import { WorkoutPlanDTO } from "../dtos/WorkoutPlanDTO";

export interface ICreateOrUpdateWorkoutPlanUseCase {
    execute(data: WorkoutPlanDTO): Promise<WorkoutPlanDTO>;
}
