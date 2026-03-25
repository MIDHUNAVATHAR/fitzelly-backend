import { IWorkoutLibraryUseCase } from "../../IUseCases/workout-library/IWorkoutLibraryUseCase";
import { IExerciseRepository } from "../../../domain/repositories/IExerciseRepository";
import { CreateExerciseDTO, UpdateExerciseDTO, ExerciseResponseDTO } from "../../dtos/workout-library/ExerciseDTO";
import { Exercise } from "../../../domain/entities/Exercise";
import { NotFoundError } from "../../errors/AppError";

export class WorkoutLibraryUseCase implements IWorkoutLibraryUseCase {
    constructor(private _exerciseRepository: IExerciseRepository) { }

    async createExercise(data: CreateExerciseDTO): Promise<ExerciseResponseDTO> {
        const exercise = new Exercise(
            "",
            data.gymId,
            data.name,
            data.instructions,
            data.reps,
            data.sets,
            data.videoUrl || "",
            false
        );

        const saved = await this._exerciseRepository.create(exercise);
        return this.mapToDTO(saved);
    }

    async updateExercise(data: UpdateExerciseDTO): Promise<ExerciseResponseDTO> {
        const existing = await this._exerciseRepository.findById(data.id);
        if (!existing) throw new NotFoundError("Exercise");

        const updated = new Exercise(
            data.id,
            data.gymId !== undefined ? data.gymId : existing.gymId,
            data.name || existing.name,
            data.instructions !== undefined ? data.instructions : existing.instructions,
            data.reps || existing.reps,
            data.sets || existing.sets,
            data.videoUrl !== undefined ? data.videoUrl : existing.videoUrl,
            existing.isDeleted,
            existing.createdAt,
            new Date()
        );

        const result = await this._exerciseRepository.update(updated);
        return this.mapToDTO(result);
    }

    async deleteExercise(id: string): Promise<boolean> {
        const existing = await this._exerciseRepository.findById(id);
        if (!existing) throw new NotFoundError("Exercise");

        return await this._exerciseRepository.delete(id);
    }

    async getExercisesByGymId(gymId: string): Promise<ExerciseResponseDTO[]> {
        const result = await this._exerciseRepository.findByGymId(gymId);
        return result.map(ex => this.mapToDTO(ex));
    }

    async getGlobalExercises(): Promise<ExerciseResponseDTO[]> {
        const result = await this._exerciseRepository.findGlobal();
        return result.map(ex => this.mapToDTO(ex));
    }

    private mapToDTO(ex: Exercise): ExerciseResponseDTO {
        return {
            id: ex.id,
            gymId: ex.gymId,
            name: ex.name,
            instructions: ex.instructions,
            reps: ex.reps,
            sets: ex.sets,
            videoUrl: ex.videoUrl,
            createdAt: ex.createdAt
        };
    }
}
