import { WorkoutTemplate } from "../../domain/entities/WorkoutTemplate";
import { IBaseRepository } from "./IBaseRepository";

export interface IWorkoutTemplateRepository extends IBaseRepository<WorkoutTemplate> {
    findByGymId(gymId: string): Promise<WorkoutTemplate[]>;
    findByTrainerId(trainerId: string): Promise<WorkoutTemplate[]>;
}
