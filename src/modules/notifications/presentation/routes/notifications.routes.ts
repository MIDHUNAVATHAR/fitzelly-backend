import { Router } from "express";
import { GYM_ROUTE } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isGymApproved } from "../../../../shared/middleware/gymApproval";
import { NotificationController } from "../controllers/NotificationController";

const allowedRoles = [ROLES.GYM, ROLES.SUPERADMIN, ROLES.CLIENT, ROLES.TRAINER];

export interface NotificationsRouteControllers {
    notificationController: NotificationController;
}

export function createNotificationsRouter(controllers: NotificationsRouteControllers): Router {
    const router = Router();
    const { notificationController } = controllers;

    router.get(
        GYM_ROUTE.NOTIFICATIONS_UNREAD,
        protect(allowedRoles),
        notificationController.getUnread.bind(notificationController)
    );

    router.get(
        GYM_ROUTE.NOTIFICATIONS_READ,
        protect(allowedRoles),
        notificationController.getRead.bind(notificationController)
    );

    router.patch(
        GYM_ROUTE.MARK_ALL_NOTIFICATIONS_READ,
        protect(allowedRoles),
        isGymApproved,
        notificationController.markAllAsRead.bind(notificationController)
    );

    router.patch(
        GYM_ROUTE.MARK_NOTIFICATION_READ,
        protect(allowedRoles),
        isGymApproved,
        notificationController.markAsRead.bind(notificationController)
    );

    return router;
}
