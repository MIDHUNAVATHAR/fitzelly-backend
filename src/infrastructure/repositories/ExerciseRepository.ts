import { Exercise } from "../../domain/entities/Exercise";
import { IExerciseRepository } from "../../domain/repositories/IExerciseRepository";
import { BaseRepository } from "./BaseRepository";
import { ExerciseModel } from "../database/mongoose/models/ExerciseModel";
import { IExerciseDocument } from "../database/mongoose/types/IExerciseDocument";

export class ExerciseRepository extends BaseRepository<Exercise, IExerciseDocument> implements IExerciseRepository {
    constructor() {
        super(ExerciseModel);
    }

    async findByGymId(gymId: string): Promise<Exercise[]> {
        const docs = await ExerciseModel.find({ gymId, isDeleted: false }).sort({ createdAt: -1 });
        return docs.map(doc => this.toEntity(doc));
    }

    async findGlobal(): Promise<Exercise[]> {
        const docs = await ExerciseModel.find({ gymId: null, isDeleted: false }).sort({ createdAt: -1 });
        return docs.map(doc => this.toEntity(doc));
    }

    async delete(id: string): Promise<boolean> {
        const result = await ExerciseModel.findByIdAndUpdate(id, { isDeleted: true });
        return !!result;
    }

    protected toEntity(doc: IExerciseDocument): Exercise {
        return new Exercise(
            doc._id.toString(),
            doc.gymId,
            doc.name,
            doc.instructions || (doc as any).description || "",
            doc.reps,
            doc.sets,
            doc.videoUrl,
            doc.isDeleted,
            doc.createdAt,
            doc.updatedAt
        );
    }

    protected toDocument(entity: Exercise): Partial<IExerciseDocument> {
        return {
            gymId: entity.gymId,
            name: entity.name,
            instructions: entity.instructions,
            reps: entity.reps,
            sets: entity.sets,
            videoUrl: entity.videoUrl,
            isDeleted: entity.isDeleted
        };
    }
}
