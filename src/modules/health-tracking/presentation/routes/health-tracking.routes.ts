import { Router } from "express";
import { CLIENT_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { HealthTrackingController } from "../controllers/HealthTrackingController";

export interface HealthTrackingRouteControllers {
    healthTrackingController: HealthTrackingController;
}

export function createHealthTrackingRouter(controllers: HealthTrackingRouteControllers): Router {
    const router = Router();
    const { healthTrackingController } = controllers;

    router.post(CLIENT_ROUTES.CLIENT_WEIGHT_LOG, protect([ROLES.CLIENT]), isSubscriptionActive, healthTrackingController.addWeightLog.bind(healthTrackingController));
    router.get(CLIENT_ROUTES.CLIENT_WEIGHT_HISTORY, protect([ROLES.CLIENT]), isSubscriptionActive, healthTrackingController.getWeightLogs.bind(healthTrackingController));

    return router;
}
