import { Router } from "express";
import { CLIENT_ROUTES } from "../../constants/routes.constants";

import { clientAuthController } from "../../main/controllers.di";
import { clientProfileController } from "../../main/controllers.di";
import { clientWorkoutPlanController } from "../../main/controllers.di";

import { validateRequest } from "../validator/validateRequest";
import { allFieldsMin3Schema } from "../validator/minLength.schema";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";
import multer from "multer";

const upload = multer();

const router = Router();

router.post(CLIENT_ROUTES.LOGIN, clientAuthController.login.bind(clientAuthController));
router.post(CLIENT_ROUTES.INITIATE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), clientAuthController.initiateForgotPassword.bind(clientAuthController));
router.post(CLIENT_ROUTES.COMPLETE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), clientAuthController.completeForgotPassword.bind(clientAuthController));
router.post(CLIENT_ROUTES.RESET_PASSWORD, validateRequest(allFieldsMin3Schema), clientAuthController.resetPassword.bind(clientAuthController));

router.get(CLIENT_ROUTES.CLIENT_PROFILE, protect([ROLES.CLIENT]), clientProfileController.getClientProfile.bind(clientProfileController));
router.patch(CLIENT_ROUTES.CLIENT_PROFILE, protect([ROLES.CLIENT]), validateRequest(allFieldsMin3Schema), clientProfileController.updateClientProfile.bind(clientProfileController));
router.post(CLIENT_ROUTES.CLIENT_PROFILE_IMAGE, protect([ROLES.CLIENT]), upload.single("profileImage"), clientProfileController.uploadClientProfileImage.bind(clientProfileController));
router.get(CLIENT_ROUTES.CLIENT_GYM_DETAILS, protect([ROLES.CLIENT]), clientProfileController.getClientGymDetails.bind(clientProfileController));
router.get(CLIENT_ROUTES.CLIENT_TRAINER_VIEW, protect([ROLES.CLIENT]), clientProfileController.getClientAssignedTrainer.bind(clientProfileController));

router.get(CLIENT_ROUTES.CLIENT_WORKOUT_PLAN, protect([ROLES.CLIENT]), clientWorkoutPlanController.getMyPlan.bind(clientWorkoutPlanController));
router.post(CLIENT_ROUTES.CLIENT_WORKOUT_PROGRESS, protect([ROLES.CLIENT]), clientWorkoutPlanController.trackProgress.bind(clientWorkoutPlanController));
router.get(CLIENT_ROUTES.CLIENT_WORKOUT_PROGRESS, protect([ROLES.CLIENT]), clientWorkoutPlanController.getProgress.bind(clientWorkoutPlanController));
router.get(CLIENT_ROUTES.CLIENT_WORKOUT_STREAK, protect([ROLES.CLIENT]), clientWorkoutPlanController.getStreak.bind(clientWorkoutPlanController));


export default router;
