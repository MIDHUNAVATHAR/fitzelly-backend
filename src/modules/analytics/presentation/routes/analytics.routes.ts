import { Router } from "express";
import multer from "multer";
import { GYM_ROUTE, SUPER_ADMIN_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { GymAnalyticsController } from "../controllers/GymAnalyticsController";
import { DashboardController } from "../controllers/DashboardController";
import { SuperAdminDashboardController } from "../controllers/SuperAdminDashboardController";
import { SuperAdminProfileController } from "../controllers/SuperAdminProfileController";

const upload = multer();

export interface AnalyticsRouteControllers {
    gymAnalyticsController: GymAnalyticsController;
    dashboardController: DashboardController;
    superAdminDashboardController: SuperAdminDashboardController;
    superAdminProfileController: SuperAdminProfileController;
}

export function createAnalyticsRouter(controllers: AnalyticsRouteControllers): Router {
    const router = Router();
    const {
        gymAnalyticsController,
        dashboardController,
        superAdminDashboardController,
        superAdminProfileController,
    } = controllers;

    // Gym Analytics & Dashboard
    router.get(
        GYM_ROUTE.GET_ANALYTICS,
        protect([ROLES.GYM]),
        gymAnalyticsController.getAnalytics.bind(gymAnalyticsController)
    );

    router.get(
        GYM_ROUTE.GET_DASHBOARD,
        protect([ROLES.GYM]),
        dashboardController.getDashboard.bind(dashboardController)
    );

    // Super Admin Dashboard & Profile
    router.get(
        SUPER_ADMIN_ROUTES.GET_DASHBOARD,
        protect([ROLES.SUPERADMIN]),
        superAdminDashboardController.getDashboard.bind(superAdminDashboardController)
    );

    router.route(SUPER_ADMIN_ROUTES.SUPER_ADMIN_PROFILE)
        .all(protect([ROLES.SUPERADMIN]))
        .get(superAdminProfileController.getSuperAdminProfile.bind(superAdminProfileController))
        .patch(superAdminProfileController.updateSuperAdminProfile.bind(superAdminProfileController));

    router.post(
        SUPER_ADMIN_ROUTES.SUPER_ADMIN_LOGO,
        protect([ROLES.SUPERADMIN]),
        upload.single("logo"),
        superAdminProfileController.updateSuperAdminLogo.bind(superAdminProfileController)
    );

    return router;
}
