import { CreateExerciseDTO, UpdateExerciseDTO, ExerciseResponseDTO } from "../../dtos/workout-library/ExerciseDTO";

export interface IWorkoutLibraryUseCase {
    createExercise(data: CreateExerciseDTO, videoFile?: any): Promise<ExerciseResponseDTO>;
    updateExercise(data: UpdateExerciseDTO, videoFile?: any): Promise<ExerciseResponseDTO>;
    deleteExercise(id: string): Promise<boolean>;
    getExercisesByGymId(gymId: string): Promise<ExerciseResponseDTO[]>;
    getGlobalExercises(): Promise<ExerciseResponseDTO[]>;
}
