import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan";

export interface IGetAvailablePlansUseCase {
    execute(): Promise<SubscriptionPlan[]>;
}
