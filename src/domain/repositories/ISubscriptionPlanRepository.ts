import { SubscriptionPlan } from "../entities/SubscriptionPlan";
import { IBaseRepository } from "./IBaseRepository";

export interface ISubscriptionPlanRepository extends IBaseRepository<SubscriptionPlan> {
    findByName(name: string): Promise<SubscriptionPlan | null>;
    findAllNotDeleted(): Promise<SubscriptionPlan[]>;
    updateById(id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan>;
}
