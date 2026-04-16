import { WorkoutPlan } from "../entities/WorkoutPlan";

export interface IWorkoutPlanRepository {
    findByClientId(clientId: string): Promise<WorkoutPlan | null>;
    findByClientIdAndWeekStart(ClientId: string, weekStartDate: Date): Promise<WorkoutPlan | null>;
    save(workoutPlan: WorkoutPlan): Promise<WorkoutPlan>;
    update(workoutPlan: WorkoutPlan): Promise<WorkoutPlan>;
}