import { Router } from "express";
import { TRAINER_ROUTES } from "../../constants/routes.constants";
import { trainerAuthController } from "../../main/di";
import { validateRequest } from "../validator/validateRequest";
import { allFieldsMin3Schema } from "../validator/minLength.schema";

const router = Router();

router.post(TRAINER_ROUTES.LOGIN, trainerAuthController.login.bind(trainerAuthController));
router.post(TRAINER_ROUTES.INITIATE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), trainerAuthController.initiateForgotPassword.bind(trainerAuthController));
router.post(TRAINER_ROUTES.COMPLETE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), trainerAuthController.completeForgotPassword.bind(trainerAuthController));
router.post(TRAINER_ROUTES.RESET_PASSWORD, validateRequest(allFieldsMin3Schema), trainerAuthController.resetPassword.bind(trainerAuthController));

export default router;
