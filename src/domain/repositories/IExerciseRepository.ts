import { Exercise } from "../../domain/entities/Exercise";
import { IBaseRepository } from "./IBaseRepository";

export interface IExerciseRepository extends IBaseRepository<Exercise> {
    findByGymId(gymId: string): Promise<Exercise[]>;
    findGlobal(): Promise<Exercise[]>;
}
