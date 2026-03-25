import { TrainerPayout } from "../../domain/entities/TrainerPayout";
import { ITrainerPayoutRepository } from "../../domain/repositories/ITrainerPayoutRepository";
import { TrainerPayoutModel } from "../database/mongoose/models/TrainerPayoutModel";
import { ITrainerPayoutDocument } from "../database/mongoose/types/ITrainerPayoutDocument";
import { BaseRepository } from "./BaseRepository";
import { TrainerPayoutMapper } from "../mapper/TrainerPayoutMapper";

export class TrainerPayoutRepository extends BaseRepository<TrainerPayout, ITrainerPayoutDocument> implements ITrainerPayoutRepository {
    constructor() {
        super(TrainerPayoutModel);
    }

    protected toEntity(doc: ITrainerPayoutDocument): TrainerPayout {
        return TrainerPayoutMapper.toEntity(doc);
    }

    protected toDocument(entity: TrainerPayout): Partial<ITrainerPayoutDocument> {
        return TrainerPayoutMapper.toDocument(entity);
    }

    async getPayoutsByGymId(
        gymId: string,
        skip: number,
        limit: number,
        trainerId?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ payouts: TrainerPayout[]; totalCount: number }> {
        const query: any = {
            gymId,
            isDeleted: false,
        };

        if (trainerId) query.trainerId = trainerId;

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(new Date(startDate).setHours(0, 0, 0, 0));
            if (endDate) query.date.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999));
        }

        const [docs, totalCount] = await Promise.all([
            this.model.find(query).sort({ date: -1 }).skip(skip).limit(limit).exec(),
            this.model.countDocuments(query).exec()
        ]);

        return {
            payouts: docs.map(doc => this.toEntity(doc)),
            totalCount
        };
    }

    async deletePayout(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndUpdate(id, { $set: { isDeleted: true } });
        return !!result;
    }

    async getPayoutsByTrainerId(
        trainerId: string,
        skip: number,
        limit: number
    ): Promise<{ payouts: TrainerPayout[]; totalCount: number }> {
        const query: any = {
            trainerId,
            isDeleted: false,
        };

        const [docs, totalCount] = await Promise.all([
            this.model.find(query).sort({ date: -1 }).skip(skip).limit(limit).exec(),
            this.model.countDocuments(query).exec()
        ]);

        return {
            payouts: docs.map(doc => this.toEntity(doc)),
            totalCount
        };
    }
}
