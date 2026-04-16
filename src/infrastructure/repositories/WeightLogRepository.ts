import { Model } from "mongoose";
import { IWeightLogDocument } from "../database/mongoose/types/IWeightLogDocument";
import { WeightLogModel } from "../database/mongoose/models/WeightLogModel";
import { IWeightLogRepository, IWeightLog } from "../../domain/repositories/IWeightLogRepository";

export class WeightLogRepository implements IWeightLogRepository {
    private model: Model<IWeightLogDocument>;

    constructor() {
        this.model = WeightLogModel;
    }

    private toEntity(doc: IWeightLogDocument): IWeightLog {
        return {
            clientId: doc.clientId,
            weight: doc.weight,
            height: doc.height,
            bmi: doc.bmi,
            date: doc.date
        };
    }

    async addLog(log: IWeightLog): Promise<IWeightLog> {
        // Normalize date to start of day
        const logDate = new Date(log.date);
        logDate.setHours(0, 0, 0, 0);

        // Check if a log already exists for this day and update it if it does
        const existingLog = await this.model.findOne({
            clientId: log.clientId,
            date: {
                $gte: logDate,
                $lt: new Date(logDate.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingLog) {
            existingLog.weight = log.weight;
            existingLog.height = log.height;
            existingLog.bmi = log.bmi;
            const updatedDoc = await existingLog.save();
            return this.toEntity(updatedDoc);
        }

        const createdDoc = await this.model.create({
            ...log,
            date: logDate
        });
        return this.toEntity(createdDoc);
    }

    async getLogsByClientId(clientId: string): Promise<IWeightLog[]> {
        const docs = await this.model.find({ clientId }).sort({ date: 1 });
        return docs.map(doc => this.toEntity(doc));
    }

    async getLatestLogByClientId(clientId: string): Promise<IWeightLog | null> {
        const doc = await this.model.findOne({ clientId }).sort({ date: -1 });
        return doc ? this.toEntity(doc) : null;
    }
}
