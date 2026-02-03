import { Router } from "express";
import { SUPER_ADMIN_ROUTES } from "../../constants/routes.constants"
import { superAdminAuthenticationController } from "../../main/di";
import { validateRequest } from "../validator/validateRequest";
import { allFieldsMin3Schema } from "../validator/minLength.schema";

const router = Router();

router.post(SUPER_ADMIN_ROUTES.LOGIN, validateRequest(allFieldsMin3Schema), superAdminAuthenticationController.login.bind(superAdminAuthenticationController))
router.post(SUPER_ADMIN_ROUTES.INITIATE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), superAdminAuthenticationController.initiateForgotPassword.bind(superAdminAuthenticationController));
router.post(SUPER_ADMIN_ROUTES.COMPLETE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), superAdminAuthenticationController.completeForgotPassword.bind(superAdminAuthenticationController))
router.post(SUPER_ADMIN_ROUTES.RESET_PASSWORD, validateRequest(allFieldsMin3Schema), superAdminAuthenticationController.resetPassword.bind(superAdminAuthenticationController))

export default router;