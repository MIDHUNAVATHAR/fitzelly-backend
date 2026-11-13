import { Router } from "express";
import { AppContainer } from "./container";

export function createApiRouter(container: AppContainer): Router {
    const rootRouter = Router();

    // Mount all module routers
    rootRouter.use("/", container.modules.auth.router);
    rootRouter.use("/", container.modules.gyms.router);
    rootRouter.use("/", container.modules.clients.router);
    rootRouter.use("/", container.modules.trainers.router);
    rootRouter.use("/", container.modules.memberships.router);
    rootRouter.use("/", container.modules.payments.router);
    rootRouter.use("/", container.modules.equipments.router);
    rootRouter.use("/", container.modules.workouts.router);
    rootRouter.use("/", container.modules.healthTracking.router);
    rootRouter.use("/", container.modules.attendance.router);
    rootRouter.use("/", container.modules.enquiries.router);
    rootRouter.use("/", container.modules.communications.router);
    rootRouter.use("/", container.modules.notifications.router);
    rootRouter.use("/", container.modules.subscriptions.router);
    rootRouter.use("/", container.modules.analytics.router);

    return rootRouter;
}
