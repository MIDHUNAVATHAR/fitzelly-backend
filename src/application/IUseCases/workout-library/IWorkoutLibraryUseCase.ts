import { CreateExerciseDTO, UpdateExerciseDTO, ExerciseResponseDTO } from "../../dtos/workout-library/ExerciseDTO";

export interface IWorkoutLibraryUseCase {
    createExercise(data: CreateExerciseDTO, videoFile?: Express.Multer.File): Promise<ExerciseResponseDTO>;
    updateExercise(data: UpdateExerciseDTO, videoFile?: Express.Multer.File): Promise<ExerciseResponseDTO>;
    deleteExercise(id: string): Promise<boolean>;
    getExercisesByGymId(gymId: string): Promise<ExerciseResponseDTO[]>;
    getGlobalExercises(): Promise<ExerciseResponseDTO[]>;
}
