import { Router } from "express";
import multer from "multer";
import { GYM_ROUTE, SUPER_ADMIN_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { GymProfileController } from "../controllers/GymProfileController";
import { SuperAdminGymsController } from "../controllers/SuperAdminGymsController";

const upload = multer();

export interface GymsRouteControllers {
    gymProfileController: GymProfileController;
    superAdminGymsController: SuperAdminGymsController;
}

export function createGymsRouter(controllers: GymsRouteControllers): Router {
    const router = Router();
    const { gymProfileController, superAdminGymsController } = controllers;

    // Gym Profile
    router.route(GYM_ROUTE.GYM_PROFILE)
        .all(protect([ROLES.GYM]))
        .get(gymProfileController.getGymProfile.bind(gymProfileController))
        .patch(gymProfileController.updateGymProfile.bind(gymProfileController));

    router.post(GYM_ROUTE.GYM_LOGO, protect([ROLES.GYM]), upload.single("logo"), gymProfileController.updateGymLogo.bind(gymProfileController));
    router.post(GYM_ROUTE.GYM_CERTIFICATE, protect([ROLES.GYM]), upload.single("certificate"), gymProfileController.uploadCertificate.bind(gymProfileController));
    router.delete(GYM_ROUTE.DELETE_GYM_CERTIFICATE, protect([ROLES.GYM]), gymProfileController.deleteCertificate.bind(gymProfileController));
    router.post(GYM_ROUTE.RE_APPLY, protect([ROLES.GYM]), gymProfileController.reApply.bind(gymProfileController));

    // SuperAdmin Gym Management
    router.get(SUPER_ADMIN_ROUTES.SUPER_ADMIN_GYMS, protect([ROLES.SUPERADMIN]), superAdminGymsController.getAllGyms.bind(superAdminGymsController));
    router.get(SUPER_ADMIN_ROUTES.GYM_BY_ID, protect([ROLES.SUPERADMIN]), superAdminGymsController.getGymById.bind(superAdminGymsController));
    router.post(SUPER_ADMIN_ROUTES.APPROVE_GYM, protect([ROLES.SUPERADMIN]), superAdminGymsController.approveGym.bind(superAdminGymsController));
    router.post(SUPER_ADMIN_ROUTES.REJECT_GYM, protect([ROLES.SUPERADMIN]), superAdminGymsController.rejectGym.bind(superAdminGymsController));
    router.patch(SUPER_ADMIN_ROUTES.UPDATE_GYM_SUBSCRIPTION, protect([ROLES.SUPERADMIN]), superAdminGymsController.updateSubscription.bind(superAdminGymsController));

    return router;
}
