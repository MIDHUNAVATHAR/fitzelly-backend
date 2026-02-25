
import { Router } from "express";
import { GYM_ROUTE } from "../../constants/routes.constants";
import { gymAuthenticationController } from "../../main/di";
import { gymProfileController } from "../../main/di";
import { gymClientController } from "../../main/di";
import { gymTrainerController } from "../../main/di";
import { validateRequest } from "../validator/validateRequest";
import { allFieldsMin3Schema } from "../validator/minLength.schema";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";
import multer from "multer";

const upload = multer();


const router = Router();

router.post(GYM_ROUTE.INITIATE_SIGNUP, validateRequest(allFieldsMin3Schema), gymAuthenticationController.initiateSignUp.bind(gymAuthenticationController));
router.post(GYM_ROUTE.COMPLETE_SINGUP, validateRequest(allFieldsMin3Schema), gymAuthenticationController.completeSignUp.bind(gymAuthenticationController))
router.post(GYM_ROUTE.LOGIN, validateRequest(allFieldsMin3Schema), gymAuthenticationController.login.bind(gymAuthenticationController));
router.post(GYM_ROUTE.INITIATE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), gymAuthenticationController.initiateForgotPassword.bind(gymAuthenticationController))
router.post(GYM_ROUTE.COMPLETE_FORGOTPASSWORD, validateRequest(allFieldsMin3Schema), gymAuthenticationController.completeForgotPassword.bind(gymAuthenticationController))
router.post(GYM_ROUTE.RESET_PASSWORD, validateRequest(allFieldsMin3Schema), gymAuthenticationController.resetPassword.bind(gymAuthenticationController));

router.route(GYM_ROUTE.GYM_PROFILE)
    .all(protect([ROLES.GYM]))
    .get(gymProfileController.getGymProfile.bind(gymProfileController))
    .patch(gymProfileController.updateGymProfile.bind(gymProfileController));

router.post(GYM_ROUTE.GYM_LOGO, protect([ROLES.GYM]), upload.single("logo"), gymProfileController.updateGymLogo.bind(gymProfileController));

router.post(GYM_ROUTE.ADD_CLIENT, protect([ROLES.GYM]), gymClientController.addClient.bind(gymClientController));
router.get(GYM_ROUTE.GET_CLIENTS, protect([ROLES.GYM]), gymClientController.getClients.bind(gymClientController))
router.get(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), gymClientController.getClientById.bind(gymClientController));
router.put(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), gymClientController.updateClient.bind(gymClientController));
router.delete(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), gymClientController.DeleteClientUseCase.bind(gymClientController))

router.post(GYM_ROUTE.ADD_TRAINER, protect([ROLES.GYM]), gymTrainerController.addTrainer.bind(gymTrainerController));
router.get(GYM_ROUTE.GET_TRAINERS, protect([ROLES.GYM]), gymTrainerController.getTrainers.bind(gymTrainerController));
router.get(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), gymTrainerController.getTrainerById.bind(gymTrainerController))
router.put(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), gymTrainerController.updateTrainer.bind(gymTrainerController))
router.delete(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), gymTrainerController.deleteTrainer.bind(gymTrainerController))


export default router; 