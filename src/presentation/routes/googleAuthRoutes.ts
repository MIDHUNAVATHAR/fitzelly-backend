import { Router } from "express";
import { googleAuthController } from "../../main/di";
import { GOOGLE_ROUTE } from "../../constants/routes.constants";


const router = Router();
router.get(GOOGLE_ROUTE.INITIATE_GOOGLELOGIN, googleAuthController.initiateGoogleLogin.bind(googleAuthController));
router.get(GOOGLE_ROUTE.GOOGLE_CALLBACK, googleAuthController.handleGoogleCallback.bind(googleAuthController));


export default router; 