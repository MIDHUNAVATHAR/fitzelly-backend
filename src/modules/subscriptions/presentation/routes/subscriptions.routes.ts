import express, { Router } from "express";
import { GYM_ROUTE, SUPER_ADMIN_ROUTES, WEBHOOK_ROUTE } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { SubscriptionPlanController } from "../controllers/SubscriptionPlanController";
import { WebhookController } from "../controllers/WebhookController";

export interface SubscriptionsRouteControllers {
    subscriptionController: SubscriptionController;
    subscriptionPlanController: SubscriptionPlanController;
    webhookController: WebhookController;
}

export function createSubscriptionsRouter(controllers: SubscriptionsRouteControllers) {
    const router = Router();
    const webhookRouter = Router();

    const { subscriptionController, subscriptionPlanController, webhookController } = controllers;

    // Webhook route (needs express.raw body parser before global express.json)
    webhookRouter.post(
        WEBHOOK_ROUTE,
        express.raw({ type: "application/json" }),
        webhookController.handleStripeWebhook.bind(webhookController)
    );

    // Gym subscription endpoints
    router.get(
        GYM_ROUTE.GYM_SUBSCRIPTIONS,
        protect([ROLES.GYM]),
        subscriptionController.getAvailablePlans.bind(subscriptionController)
    );
    router.post(
        GYM_ROUTE.CREATE_SUBSCRIPTION_SESSION,
        protect([ROLES.GYM]),
        subscriptionController.createCheckoutSession.bind(subscriptionController)
    );
    router.post(
        GYM_ROUTE.CONFIRM_SUBSCRIPTION,
        protect([ROLES.GYM]),
        subscriptionController.confirmSubscription.bind(subscriptionController)
    );

    // Super-admin subscription plan endpoints
    router.route(SUPER_ADMIN_ROUTES.SUBSCRIPTION_PLANS)
        .all(protect([ROLES.SUPERADMIN]))
        .get(subscriptionPlanController.getAll.bind(subscriptionPlanController))
        .post(subscriptionPlanController.create.bind(subscriptionPlanController));

    router.route(SUPER_ADMIN_ROUTES.SUBSCRIPTION_PLAN_BY_ID)
        .all(protect([ROLES.SUPERADMIN]))
        .patch(subscriptionPlanController.update.bind(subscriptionPlanController))
        .delete(subscriptionPlanController.delete.bind(subscriptionPlanController));

    return {
        router,
        webhookRouter,
    };
}
