import { BaseRepository } from "../../../../shared/database/BaseRepository";
import { Subscription } from "../../domain/entities/Subscription";
import { ISubscriptionDocument } from "../../../../shared/database/mongoose/types/ISubscriptionDocument";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { SubscriptionModel } from "../models/SubscriptionModel";
import { SubscriptionMapper } from "../models/SubscriptionMapper";

export class SubscriptionRepository extends BaseRepository<Subscription, ISubscriptionDocument> implements ISubscriptionRepository {
    constructor() {
        super(SubscriptionModel);
    }

    protected toEntity(doc: ISubscriptionDocument): Subscription {
        return SubscriptionMapper.toEntity(doc);
    }

    protected toDocument(entity: Subscription): Partial<ISubscriptionDocument> {
        return SubscriptionMapper.toDocument(entity);
    }

    async findLatestSubscriptionByGymId(gymId: string): Promise<Subscription | null> {
        const doc = await this.model.findOne({ gymId })
            .sort({ createdAt: -1 })
            .limit(1);
        return doc ? this.toEntity(doc) : null;
    }

    async hasTrialSubscription(gymId: string): Promise<boolean> {
        const doc = await this.model.findOne({ gymId, planName: "TRIAL" });
        return !!doc;
    }
}
