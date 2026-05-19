import { ICreateCheckoutSessionUseCase, ICreateCheckoutSessionInput, ICheckoutSessionResult } from "../../IUseCases/subscription/ICreateCheckoutSessionUseCase";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { IPaymentService } from "../../../domain/services/IPaymentService";
import { AppError } from "../../errors/AppError";
import { HttpStatus } from "../../../constants/statusCodes.constants";

export class CreateCheckoutSessionUseCase implements ICreateCheckoutSessionUseCase {
    constructor(
        private _subscriptionRepo: ISubscriptionRepository,
        private _planRepo: ISubscriptionPlanRepository,
        private _paymentService: IPaymentService
    ) {}

    async execute(input: ICreateCheckoutSessionInput): Promise<ICheckoutSessionResult> {
        const { planId, gymId, gymEmail } = input;

        // Check if user already has an active subscription
        const latestSub = await this._subscriptionRepo.findLatestSubscriptionByGymId(gymId);
        if (latestSub && latestSub.status === "active") {
            throw new AppError("Your current subscription is not expired yet.", HttpStatus.BAD_REQUEST);
        }

        const plan = await this._planRepo.findById(planId);
        if (!plan) {
            throw new AppError("Plan not found", HttpStatus.NOT_FOUND);
        }

        const result = await this._paymentService.createCheckoutSession({
            gymId,
            gymEmail,
            planId,
            planName: plan.name,
            planDescription: plan.description,
            planDurationMonths: plan.durationMonths,
            price: plan.price
        });

        return result;
    }
}
