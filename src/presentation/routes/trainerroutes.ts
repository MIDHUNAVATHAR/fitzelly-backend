import { Router } from "express";
import { TRAINER_ROUTES } from "../../constants/routes.constants";
import { trainerAuthController } from "../../main/controllers.di"; 
import { validateRequest } from "../validator/validateRequest";
import { allFieldsMin3Schema } from "../validator/minLength.schema";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";
import multer from "multer";

import { 
    trainerProfileController, 
    trainerWorkoutPlanController, 
    workoutLibraryController, 
    workoutTemplateController,
    trainerPayoutController
} from "../../main/controllers.di";


const upload = multer();

const router = Router();

router.post(TRAINER_ROUTES.LOGIN, trainerAuthController.login.bind(trainerAuthController));
router.post(TRAINER_ROUTES.INITIATE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), trainerAuthController.initiateForgotPassword.bind(trainerAuthController));
router.post(TRAINER_ROUTES.COMPLETE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), trainerAuthController.completeForgotPassword.bind(trainerAuthController));
router.post(TRAINER_ROUTES.RESET_PASSWORD, validateRequest(allFieldsMin3Schema), trainerAuthController.resetPassword.bind(trainerAuthController));

router.get(TRAINER_ROUTES.TRAINER_PROFILE, protect([ROLES.TRAINER]), trainerProfileController.getTrainerProfile.bind(trainerProfileController));
router.patch(TRAINER_ROUTES.TRAINER_PROFILE, protect([ROLES.TRAINER]), trainerProfileController.updateTrainerProfile.bind(trainerProfileController));
router.post(TRAINER_ROUTES.TRAINER_PROFILE_IMAGE, protect([ROLES.TRAINER]), upload.single('profilePhoto'), trainerProfileController.uploadTrainerProfileImage.bind(trainerProfileController));
router.get(TRAINER_ROUTES.TRAINER_GYM_DETAILS, protect([ROLES.TRAINER]), trainerProfileController.getTrainerGymDetails.bind(trainerProfileController));
router.get(TRAINER_ROUTES.TRAINER_CLIENTS, protect([ROLES.TRAINER]), trainerProfileController.getAssignedClients.bind(trainerProfileController));
router.get(TRAINER_ROUTES.TRAINER_CLIENT_VIEW, protect([ROLES.TRAINER]), trainerProfileController.getAssignedClientById.bind(trainerProfileController));

router.post(TRAINER_ROUTES.TRAINER_WORKOUT_PLAN, protect([ROLES.TRAINER]), trainerWorkoutPlanController.createOrUpdatePlan.bind(trainerWorkoutPlanController));
router.get(TRAINER_ROUTES.TRAINER_WORKOUT_PLAN, protect([ROLES.TRAINER]), trainerWorkoutPlanController.getClientPlan.bind(trainerWorkoutPlanController));

// Workout Library
router.get(TRAINER_ROUTES.GET_EXERCISES, protect([ROLES.TRAINER, ROLES.GYM]), workoutLibraryController.getExercises.bind(workoutLibraryController));

// Workout Templates
router.post(TRAINER_ROUTES.ADD_TEMPLATE, protect([ROLES.TRAINER]), workoutTemplateController.createTemplate.bind(workoutTemplateController));
router.get(TRAINER_ROUTES.GET_TEMPLATES, protect([ROLES.TRAINER]), workoutTemplateController.getTemplates.bind(workoutTemplateController));
router.delete(TRAINER_ROUTES.DELETE_TEMPLATE, protect([ROLES.TRAINER]), workoutTemplateController.deleteTemplate.bind(workoutTemplateController));
router.post(TRAINER_ROUTES.ASSIGN_TEMPLATE, protect([ROLES.TRAINER]), workoutTemplateController.assignTemplate.bind(workoutTemplateController));

router.get(TRAINER_ROUTES.TRAINER_EARNINGS, protect([ROLES.TRAINER]), trainerPayoutController.getEarningsForTrainer.bind(trainerPayoutController));


export default router;
