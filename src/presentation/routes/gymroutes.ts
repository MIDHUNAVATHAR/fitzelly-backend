
import { Router } from "express";
import { GYM_ROUTE } from "../../constants/routes.constants";
import { gymAuthenticationController } from "../../main/di";
import { validateRequest } from "../validator/validateRequest";
import { allFieldsMin3Schema } from "../validator/minLength.schema";


const router = Router();

router.post(GYM_ROUTE.INITIATE_SIGNUP, validateRequest(allFieldsMin3Schema), gymAuthenticationController.initiateSignUp.bind(gymAuthenticationController));
router.post(GYM_ROUTE.COMPLETE_SINGUP, validateRequest(allFieldsMin3Schema), gymAuthenticationController.completeSignUp.bind(gymAuthenticationController))
router.post(GYM_ROUTE.LOGIN, validateRequest(allFieldsMin3Schema), gymAuthenticationController.login.bind(gymAuthenticationController));
router.post(GYM_ROUTE.INITIATE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), gymAuthenticationController.initiateForgotPassword.bind(gymAuthenticationController))
router.post(GYM_ROUTE.COMPLETE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), gymAuthenticationController.completeForgotPassword.bind(gymAuthenticationController))
router.post(GYM_ROUTE.RESET_PASSWORD, validateRequest(allFieldsMin3Schema), gymAuthenticationController.resetPassword.bind(gymAuthenticationController));


export default router; 