import { WorkoutPlanDTO } from "../../dtos/workout-plan/WorkoutPlanDTO";

export interface ICreateOrUpdateWorkoutPlanUseCase {
    execute(data: WorkoutPlanDTO): Promise<WorkoutPlanDTO>;
}
