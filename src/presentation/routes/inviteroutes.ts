import { Router } from "express";
import { inviteController, gymClientController, gymTrainerController } from "../../main/di";
import { GYM_ROUTE, CREATE_PASSWORD_ROUTE } from "../../constants/routes.constants";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";

const router = Router();

router.post(GYM_ROUTE.CLIENT_INVITE, protect([ROLES.GYM]), gymClientController.sendWelcomeEmail.bind(gymClientController));
router.post(GYM_ROUTE.TRAINER_INVITE, protect([ROLES.GYM]), gymTrainerController.sendWelcomeEmail.bind(gymTrainerController));
router.post(CREATE_PASSWORD_ROUTE, inviteController.createPassword.bind(inviteController));


export default router;

