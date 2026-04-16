import { IBaseRepository } from "./IBaseRepository";
import { Subscription } from "../entities/Subscription";

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
    findLatestSubscriptionByGymId(gymId: string): Promise<Subscription | null>;
    hasTrialSubscription(gymId: string): Promise<boolean>;
}
