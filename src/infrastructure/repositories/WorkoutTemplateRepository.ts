import { WorkoutTemplate } from "../../domain/entities/WorkoutTemplate";
import { IWorkoutTemplateRepository } from "../../domain/repositories/IWorkoutTemplateRepository";
import { BaseRepository } from "./BaseRepository";
import { WorkoutTemplateModel } from "../database/mongoose/models/WorkoutTemplateModel";
import { IWorkoutTemplateDocument } from "../database/mongoose/types/IWorkoutTemplateDocument";
import { Types } from "mongoose";


export class WorkoutTemplateRepository extends BaseRepository<WorkoutTemplate, IWorkoutTemplateDocument> implements IWorkoutTemplateRepository {
    constructor() {
        super(WorkoutTemplateModel);
    }

    async findByGymId(gymId: string): Promise<WorkoutTemplate[]> {
        const docs = await WorkoutTemplateModel.find({ gymId }).sort({ createdAt: -1 });
        return docs.map(doc => this.toEntity(doc));
    }

    async findByTrainerId(trainerId: string): Promise<WorkoutTemplate[]> {
        const docs = await WorkoutTemplateModel.find({ trainerId }).sort({ createdAt: -1 });
        return docs.map(doc => this.toEntity(doc));
    }

    protected toEntity(doc: IWorkoutTemplateDocument): WorkoutTemplate {
        return new WorkoutTemplate(
            doc._id.toString(),
            doc.gymId,
            doc.trainerId,
            doc.name,
            doc.days.map(d => ({
                day: d.day,
                exerciseIds: d.exercises.map(ex => ex.toString())
            })),
            doc.createdAt,
            doc.updatedAt
        );
    }

    protected toDocument(entity: WorkoutTemplate): Partial<IWorkoutTemplateDocument> {
         return {
        gymId: entity.gymId,
        trainerId: entity.trainerId,
        name: entity.name,
        days: entity.days.map(day => ({
            day: day.day,
            exercises: day.exerciseIds.map(id => new Types.ObjectId(id))
        })),
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
    };
    }
}
