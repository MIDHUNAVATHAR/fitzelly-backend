import { IBaseRepository } from "../../../../shared/database/BaseRepository";
import { Subscription } from "../../domain/entities/Subscription";

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
    findLatestSubscriptionByGymId(gymId: string): Promise<Subscription | null>;
    hasTrialSubscription(gymId: string): Promise<boolean>;
}
