import { IGetAvailablePlansUseCase } from "../../IUseCases/subscription/IGetAvailablePlansUseCase";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan";

export class GetAvailablePlansUseCase implements IGetAvailablePlansUseCase {
    constructor(private _planRepo: ISubscriptionPlanRepository) {}

    async execute(): Promise<SubscriptionPlan[]> {
        return this._planRepo.findAllNotDeleted();
    }
}
