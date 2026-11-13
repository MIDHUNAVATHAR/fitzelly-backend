import { SubscriptionRepository } from "./infrastructure/repositories/SubscriptionRepository";
import { SubscriptionPlanRepository } from "./infrastructure/repositories/SubscriptionPlanRepository";

import { GetAvailablePlansUseCase } from "./application/use-cases/GetAvailablePlansUseCase";
import { CreateCheckoutSessionUseCase } from "./application/use-cases/CreateCheckoutSessionUseCase";
import { ConfirmSubscriptionUseCase } from "./application/use-cases/ConfirmSubscriptionUseCase";
import { FulfillSubscriptionUseCase } from "./application/use-cases/FulfillSubscriptionUseCase";
import { HandleStripeWebhookUseCase } from "./application/use-cases/HandleStripeWebhookUseCase";

import {
    AddSubscriptionPlanUseCase,
    GetAllSubscriptionPlansUseCase,
    UpdateSubscriptionPlanUseCase,
    DeleteSubscriptionPlanUseCase,
} from "./application/use-cases/SubscriptionPlanUseCases";

import { SubscriptionController } from "./presentation/controllers/SubscriptionController";
import { SubscriptionPlanController } from "./presentation/controllers/SubscriptionPlanController";
import { WebhookController } from "./presentation/controllers/WebhookController";
import { createSubscriptionsRouter } from "./presentation/routes/subscriptions.routes";

import { IPaymentService } from "../../shared/services/IPaymentService";
import { IGymRepository } from "../gyms/domain/repositories/IGymRepository";

export interface SubscriptionsModuleDependencies {
    paymentService: IPaymentService;
    gymRepository: IGymRepository;
    subscriptionRepository?: SubscriptionRepository;
    subscriptionPlanRepository?: SubscriptionPlanRepository;
}

export function initSubscriptionsModule(deps: SubscriptionsModuleDependencies) {
    const subscriptionRepository = deps.subscriptionRepository ?? new SubscriptionRepository();
    const subscriptionPlanRepository = deps.subscriptionPlanRepository ?? new SubscriptionPlanRepository();

    const getAvailablePlansUseCase = new GetAvailablePlansUseCase(subscriptionPlanRepository);
    const createCheckoutSessionUseCase = new CreateCheckoutSessionUseCase(
        subscriptionRepository,
        subscriptionPlanRepository,
        deps.paymentService
    );
    const confirmSubscriptionUseCase = new ConfirmSubscriptionUseCase(deps.paymentService);

    const fulfillSubscriptionUseCase = new FulfillSubscriptionUseCase(
        subscriptionRepository,
        subscriptionPlanRepository,
        deps.gymRepository
    );

    const handleStripeWebhookUseCase = new HandleStripeWebhookUseCase(
        deps.paymentService,
        fulfillSubscriptionUseCase
    );

    const addSubscriptionPlanUseCase = new AddSubscriptionPlanUseCase(subscriptionPlanRepository);
    const getAllSubscriptionPlansUseCase = new GetAllSubscriptionPlansUseCase(subscriptionPlanRepository);
    const updateSubscriptionPlanUseCase = new UpdateSubscriptionPlanUseCase(subscriptionPlanRepository);
    const deleteSubscriptionPlanUseCase = new DeleteSubscriptionPlanUseCase(subscriptionPlanRepository);

    const subscriptionController = new SubscriptionController(
        getAvailablePlansUseCase,
        createCheckoutSessionUseCase,
        confirmSubscriptionUseCase
    );

    const subscriptionPlanController = new SubscriptionPlanController(
        addSubscriptionPlanUseCase,
        getAllSubscriptionPlansUseCase,
        updateSubscriptionPlanUseCase,
        deleteSubscriptionPlanUseCase
    );

    const webhookController = new WebhookController(handleStripeWebhookUseCase);

    const { router, webhookRouter } = createSubscriptionsRouter({
        subscriptionController,
        subscriptionPlanController,
        webhookController,
    });

    return {
        router,
        webhookRouter,
        repositories: {
            subscriptionRepository,
            subscriptionPlanRepository,
        },
        controllers: {
            subscriptionController,
            subscriptionPlanController,
            webhookController,
        },
        useCases: {
            getAvailablePlansUseCase,
            createCheckoutSessionUseCase,
            confirmSubscriptionUseCase,
            fulfillSubscriptionUseCase,
            handleStripeWebhookUseCase,
            addSubscriptionPlanUseCase,
            getAllSubscriptionPlansUseCase,
            updateSubscriptionPlanUseCase,
            deleteSubscriptionPlanUseCase,
        },
    };
}
