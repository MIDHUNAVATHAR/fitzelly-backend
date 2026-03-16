import { Model } from "mongoose";
import { IWorkoutLogDocument } from "../database/mongoose/types/IWorkoutLogDocument";
import { WorkoutLogModel } from "../database/mongoose/models/WorkoutLogModel";
import { IWorkoutLogRepository, IWorkoutLog } from "../../domain/repositories/IWorkoutLogRepository";

export class WorkoutLogRepository implements IWorkoutLogRepository {
    private model: Model<IWorkoutLogDocument>;

    constructor() {
        this.model = WorkoutLogModel;
    }

    private toEntity(doc: IWorkoutLogDocument): IWorkoutLog {
        return {
            clientId: doc.clientId,
            date: doc.date,
            completedExercises: doc.completedExercises
        };
    }

    async findByClientIdAndDate(clientId: string, date: Date): Promise<IWorkoutLog | null> {
        // Normalize date to start of day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const doc = await this.model.findOne({
            clientId,
            date: startOfDay
        });
        return doc ? this.toEntity(doc) : null;
    }

    async findByClientId(clientId: string): Promise<IWorkoutLog[]> {
        const docs = await this.model.find({ clientId }).sort({ date: -1 });
        return docs.map(doc => this.toEntity(doc));
    }

    async save(log: IWorkoutLog): Promise<IWorkoutLog> {
        const startOfDay = new Date(log.date);
        startOfDay.setHours(0, 0, 0, 0);

        const createdDoc = await this.model.create({
            ...log,
            date: startOfDay
        });
        return this.toEntity(createdDoc);
    }

    async update(log: IWorkoutLog): Promise<IWorkoutLog> {
        const startOfDay = new Date(log.date);
        startOfDay.setHours(0, 0, 0, 0);

        const updatedDoc = await this.model.findOneAndUpdate(
            { clientId: log.clientId, date: startOfDay },
            { $set: { completedExercises: log.completedExercises } },
            { new: true, upsert: true }
        );
        return this.toEntity(updatedDoc);
    }
}
