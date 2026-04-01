import { Router } from "express";
import { SUPER_ADMIN_ROUTES } from "../../constants/routes.constants"
import { superAdminAuthenticationController } from "../../main/controllers.di";
import { superAdminProfileController } from "../../main/controllers.di";
import { superAdminGymsController, workoutLibraryController } from "../../main/controllers.di";
import { validateRequest } from "../validator/validateRequest";
import { allFieldsMin3Schema } from "../validator/minLength.schema";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";
import multer from "multer";

const upload = multer();
const router = Router();


router.post(SUPER_ADMIN_ROUTES.LOGIN, validateRequest(allFieldsMin3Schema), superAdminAuthenticationController.login.bind(superAdminAuthenticationController))
router.post(SUPER_ADMIN_ROUTES.INITIATE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), superAdminAuthenticationController.initiateForgotPassword.bind(superAdminAuthenticationController));
router.post(SUPER_ADMIN_ROUTES.COMPLETE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), superAdminAuthenticationController.completeForgotPassword.bind(superAdminAuthenticationController))
router.post(SUPER_ADMIN_ROUTES.RESET_PASSWORD, validateRequest(allFieldsMin3Schema), superAdminAuthenticationController.resetPassword.bind(superAdminAuthenticationController))

router.route(SUPER_ADMIN_ROUTES.SUPER_ADMIN_PROFILE)
    .all(protect([ROLES.SUPERADMIN]))
    .get(superAdminProfileController.getSuperAdminProfile.bind(superAdminProfileController))
    .patch(superAdminProfileController.updateSuperAdminProfile.bind(superAdminProfileController));

router.post(SUPER_ADMIN_ROUTES.SUPER_ADMIN_LOGO, protect([ROLES.SUPERADMIN]), upload.single('logo'), superAdminProfileController.updateSuperAdminLogo.bind(superAdminProfileController));
router.get(SUPER_ADMIN_ROUTES.SUPER_ADMIN_GYMS, protect([ROLES.SUPERADMIN]), superAdminGymsController.getAllGyms.bind(superAdminGymsController));

router.get(SUPER_ADMIN_ROUTES.GYM_BY_ID, protect([ROLES.SUPERADMIN]), superAdminGymsController.getGymById.bind(superAdminGymsController));
router.post(SUPER_ADMIN_ROUTES.APPROVE_GYM, protect([ROLES.SUPERADMIN]), superAdminGymsController.approveGym.bind(superAdminGymsController));
router.post(SUPER_ADMIN_ROUTES.REJECT_GYM, protect([ROLES.SUPERADMIN]), superAdminGymsController.rejectGym.bind(superAdminGymsController));

// Workout Library (Global)
router.route(SUPER_ADMIN_ROUTES.WORKOUT_LIBRARY)
    .all(protect([ROLES.SUPERADMIN]))
    .get(workoutLibraryController.getExercises.bind(workoutLibraryController))
    .post(workoutLibraryController.createExercise.bind(workoutLibraryController));

router.route(SUPER_ADMIN_ROUTES.WORKOUT_LIBRARY_BY_ID)
    .all(protect([ROLES.SUPERADMIN]))
    .patch(workoutLibraryController.updateExercise.bind(workoutLibraryController))
    .delete(workoutLibraryController.deleteExercise.bind(workoutLibraryController));

export default router;