import { Router } from "express";
import {
    GYM_ROUTE,
    CLIENT_ROUTES,
    TRAINER_ROUTES,
    SUPER_ADMIN_ROUTES,
    GOOGLE_ROUTE,
    REFRESH_ROUTE,
    LOGOUT_ROUTE,
    CREATE_PASSWORD_ROUTE,
    SECURITY_ROUTES
} from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect, AuthRequest } from "../../../../shared/middleware/protect";
import { validateRequest } from "../../../../shared/middleware/validateRequest";
import { allFieldsMin3Schema } from "../../../../shared/middleware/minLength.schema";

import { GymAuthenticationController } from "../controllers/GymAuthenticationController";
import { ClientAuthController } from "../controllers/ClientAuthController";
import { TrainerAuthController } from "../controllers/TrainerAuthController";
import { SuperAdminAuthenticationController } from "../controllers/SuperAdminAuthenticationController";
import { GoogleAuthController } from "../controllers/GoogleAuthController";
import { TokenRefreshController } from "../controllers/TokenRefreshController";
import { InviteController } from "../controllers/InviteController";
import { SecurityController } from "../controllers/SecurityController";

export interface AuthRouteControllers {
    gymAuthController: GymAuthenticationController;
    clientAuthController: ClientAuthController;
    trainerAuthController: TrainerAuthController;
    superAdminAuthController: SuperAdminAuthenticationController;
    googleAuthController: GoogleAuthController;
    tokenRefreshController: TokenRefreshController;
    inviteController: InviteController;
    securityController: SecurityController;
}

export function createAuthRouter(controllers: AuthRouteControllers): Router {
    const router = Router();
    const {
        gymAuthController,
        clientAuthController,
        trainerAuthController,
        superAdminAuthController,
        googleAuthController,
        tokenRefreshController,
        inviteController,
        securityController,
    } = controllers;

    // Gym Auth
    router.post(
        GYM_ROUTE.INITIATE_SIGNUP,
        validateRequest(allFieldsMin3Schema),
        gymAuthController.initiateSignUp.bind(gymAuthController)
    );
    router.post(
        GYM_ROUTE.COMPLETE_SINGUP,
        validateRequest(allFieldsMin3Schema),
        gymAuthController.completeSignUp.bind(gymAuthController)
    );
    router.post(GYM_ROUTE.LOGIN, gymAuthController.login.bind(gymAuthController));
    router.post(
        GYM_ROUTE.INITIATE_FORGOTPASSWORD,
        validateRequest(allFieldsMin3Schema),
        gymAuthController.initiateForgotPassword.bind(gymAuthController)
    );
    router.post(
        GYM_ROUTE.COMPLETE_FORGOTPASSWORD,
        validateRequest(allFieldsMin3Schema),
        gymAuthController.completeForgotPassword.bind(gymAuthController)
    );
    router.post(
        GYM_ROUTE.RESET_PASSWORD,
        validateRequest(allFieldsMin3Schema),
        gymAuthController.resetPassword.bind(gymAuthController)
    );

    // Client Auth
    router.post(CLIENT_ROUTES.LOGIN, clientAuthController.login.bind(clientAuthController));
    router.post(
        CLIENT_ROUTES.INITIATE_FORGOTPASSWORD,
        validateRequest(allFieldsMin3Schema),
        clientAuthController.initiateForgotPassword.bind(clientAuthController)
    );
    router.post(
        CLIENT_ROUTES.COMPLETE_FORGOTPASSWORD,
        validateRequest(allFieldsMin3Schema),
        clientAuthController.completeForgotPassword.bind(clientAuthController)
    );
    router.post(
        CLIENT_ROUTES.RESET_PASSWORD,
        validateRequest(allFieldsMin3Schema),
        clientAuthController.resetPassword.bind(clientAuthController)
    );

    // Trainer Auth
    router.post(TRAINER_ROUTES.LOGIN, trainerAuthController.login.bind(trainerAuthController));
    router.post(
        TRAINER_ROUTES.INITIATE_FORGOTPASSWORD,
        validateRequest(allFieldsMin3Schema),
        trainerAuthController.initiateForgotPassword.bind(trainerAuthController)
    );
    router.post(
        TRAINER_ROUTES.COMPLETE_FORGOTPASSWORD,
        validateRequest(allFieldsMin3Schema),
        trainerAuthController.completeForgotPassword.bind(trainerAuthController)
    );
    router.post(
        TRAINER_ROUTES.RESET_PASSWORD,
        validateRequest(allFieldsMin3Schema),
        trainerAuthController.resetPassword.bind(trainerAuthController)
    );

    // SuperAdmin Auth
    router.post(
        SUPER_ADMIN_ROUTES.LOGIN,
        validateRequest(allFieldsMin3Schema),
        superAdminAuthController.login.bind(superAdminAuthController)
    );
    router.post(
        SUPER_ADMIN_ROUTES.INITIATE_FORGOTPASSWORD,
        validateRequest(allFieldsMin3Schema),
        superAdminAuthController.initiateForgotPassword.bind(superAdminAuthController)
    );
    router.post(
        SUPER_ADMIN_ROUTES.COMPLETE_FORGOTPASSWORD,
        validateRequest(allFieldsMin3Schema),
        superAdminAuthController.completeForgotPassword.bind(superAdminAuthController)
    );
    router.post(
        SUPER_ADMIN_ROUTES.RESET_PASSWORD,
        validateRequest(allFieldsMin3Schema),
        superAdminAuthController.resetPassword.bind(superAdminAuthController)
    );

    // Google Auth
    router.get(
        GOOGLE_ROUTE.INITIATE_GOOGLELOGIN,
        googleAuthController.initiateGoogleLogin.bind(googleAuthController)
    );
    router.get(
        GOOGLE_ROUTE.GOOGLE_CALLBACK,
        googleAuthController.handleGoogleCallback.bind(googleAuthController)
    );

    // Refresh & Logout
    router.get(
        REFRESH_ROUTE.REFRESH,
        tokenRefreshController.refreshToken.bind(tokenRefreshController)
    );
    router.post(
        LOGOUT_ROUTE.LOGOUT,
        tokenRefreshController.logout.bind(tokenRefreshController)
    );

    // Invite / Password Activation
    router.post(
        CREATE_PASSWORD_ROUTE,
        inviteController.createPassword.bind(inviteController)
    );

    // Security & Sessions
    const allRoles = [ROLES.GYM, ROLES.CLIENT, ROLES.TRAINER, ROLES.SUPERADMIN];
    router.get(
        SECURITY_ROUTES.ACTIVE_SESSIONS,
        protect(allRoles),
        (req, res, next) => securityController.getActiveSessions(req as AuthRequest, res, next)
    );
    router.delete(
        SECURITY_ROUTES.REVOKE_SESSION,
        protect(allRoles),
        (req, res, next) => securityController.revokeSession(req as AuthRequest, res, next)
    );

    return router;
}
