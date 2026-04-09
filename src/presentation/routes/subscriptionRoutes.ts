import { Router } from "express";
import { GYM_ROUTE } from "../../constants/routes.constants";
import { subscriptionController } from "../../main/controllers.di";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";

const router = Router();

router.get(GYM_ROUTE.GYM_SUBSCRIPTIONS, protect([ROLES.GYM]), subscriptionController.getAvailablePlans.bind(subscriptionController));
router.post(GYM_ROUTE.CREATE_SUBSCRIPTION_SESSION, protect([ROLES.GYM]), subscriptionController.createCheckoutSession.bind(subscriptionController));
router.post(GYM_ROUTE.CONFIRM_SUBSCRIPTION, protect([ROLES.GYM]), subscriptionController.confirmSubscription.bind(subscriptionController));

export default router;
