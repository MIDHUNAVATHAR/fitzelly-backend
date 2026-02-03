import { Router } from "express";
import { googleAuthController } from "../../main/di";

const router = Router();
router.get("/google", googleAuthController.initiateGoogleLogin.bind(googleAuthController));
router.get("/google/callback", googleAuthController.handleGoogleCallback.bind(googleAuthController));


export default router; 