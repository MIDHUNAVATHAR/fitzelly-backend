import { BaseRepository } from "./BaseRepository";
import { WorkoutPlan } from "../../domain/entities/WorkoutPlan";
import { IWorkoutPlanDocument } from "../database/mongoose/types/IWorkoutPlanDocument";
import { WorkoutPlanModel } from "../database/mongoose/models/WorkoutPlanModel";
import { IWorkoutPlanRepository } from "../../domain/repositories/IWorkoutPlanRepository";

export class WorkoutPlanRepository extends BaseRepository<WorkoutPlan, IWorkoutPlanDocument> implements IWorkoutPlanRepository {
    constructor() {
        super(WorkoutPlanModel);
    }

    protected toEntity(doc: IWorkoutPlanDocument): WorkoutPlan {
        return new WorkoutPlan(
            doc._id.toString(),
            doc.clientId,
            doc.trainerId,
            doc.gymId,
            doc.weeklyPlan,
            doc.weekStartDate,
            doc.notes,
            doc.createdAt,
            doc.updatedAt
        );
    }

    protected toDocument(entity: WorkoutPlan): Partial<IWorkoutPlanDocument> {
        return {
            clientId: entity.clientId,
            trainerId: entity.trainerId,
            gymId: entity.gymId,
            weeklyPlan: entity.weeklyPlan,
            weekStartDate: entity.weekStartDate,
            notes: entity.notes
        };
    }

    async findByClientId(clientId: string): Promise<WorkoutPlan | null> {
        const doc = await this.model.findOne({ clientId }).sort({ weekStartDate: -1 });
        return doc ? this.toEntity(doc) : null;
    }

    async findByClientIdAndWeekStart(clientId: string, weekStartDate: Date): Promise<WorkoutPlan | null> {
        const start = new Date(weekStartDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(weekStartDate);
        end.setHours(23, 59, 59, 999);

        const doc = await this.model.findOne({
            clientId,
            weekStartDate: { $gte: start, $lte: end }
        });
        return doc ? this.toEntity(doc) : null;
    }

    async save(workoutPlan: WorkoutPlan): Promise<WorkoutPlan> {
        return this.create(workoutPlan);
    }

    async update(entity: WorkoutPlan): Promise<WorkoutPlan> {
        const doc = this.toDocument(entity);
        const updatedDoc = await this.model.findByIdAndUpdate(
            entity.id,
            { $set: doc },
            { new: true }
        );
        if (!updatedDoc) throw new Error("Entity not found");
        return this.toEntity(updatedDoc);
    }
}

