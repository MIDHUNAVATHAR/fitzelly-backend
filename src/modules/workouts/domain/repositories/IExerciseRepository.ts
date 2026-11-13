import { Exercise } from "../../domain/entities/Exercise";
import { IBaseRepository } from "../../../../shared/database/BaseRepository";

export interface IExerciseRepository extends IBaseRepository<Exercise> {
    findByGymId(gymId: string): Promise<Exercise[]>;
    findGlobal(): Promise<Exercise[]>;
}
