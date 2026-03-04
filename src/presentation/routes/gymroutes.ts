
import { Router } from "express";
import { GYM_ROUTE } from "../../constants/routes.constants";
import { gymAuthenticationController } from "../../main/di";
import { gymProfileController } from "../../main/di";
import { gymClientController } from "../../main/di";
import { gymTrainerController } from "../../main/di";
import { gymPlanController } from "../../main/di";
import { gymEquipmentController } from "../../main/di";
import { gymMembershipController } from "../../main/di";



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


router.post(GYM_ROUTE.ADD_PLAN, protect([ROLES.GYM]),  gymPlanController.addPlan.bind(gymPlanController));
router.get(GYM_ROUTE.GET_PLANS, protect([ROLES.GYM]), gymPlanController.getPlans.bind(gymPlanController));
router.patch(GYM_ROUTE.UPDATE_PLAN, protect([ROLES.GYM]),  gymPlanController.updatePlan.bind(gymPlanController));
router.delete(GYM_ROUTE.DELETE_PLAN, protect([ROLES.GYM]),  gymPlanController.deletePlan.bind(gymPlanController));


// Memberships
router.post(GYM_ROUTE.ADD_MEMBERSHIP, protect([ROLES.GYM]), gymMembershipController.addMembership.bind(gymMembershipController));
router.get(GYM_ROUTE.GET_MEMBERSHIPS, protect([ROLES.GYM]), gymMembershipController.getMemberships.bind(gymMembershipController));
router.get(GYM_ROUTE.MEMBERSHIP_BY_ID, protect([ROLES.GYM]), gymMembershipController.getMembershipById.bind(gymMembershipController));
router.patch(GYM_ROUTE.MEMBERSHIP_BY_ID, protect([ROLES.GYM]), gymMembershipController.updateMembership.bind(gymMembershipController));
router.delete(GYM_ROUTE.MEMBERSHIP_BY_ID, protect([ROLES.GYM]), gymMembershipController.deleteMembership.bind(gymMembershipController));

// Payments
router.post(GYM_ROUTE.ADD_PAYMENT, protect([ROLES.GYM]), gymMembershipController.addPayment.bind(gymMembershipController));
router.patch(GYM_ROUTE.PAYMENT_BY_ID, protect([ROLES.GYM]), gymMembershipController.updatePayment.bind(gymMembershipController));
router.delete(GYM_ROUTE.PAYMENT_BY_ID, protect([ROLES.GYM]), gymMembershipController.deletePayment.bind(gymMembershipController));

// Equipments
router.post(GYM_ROUTE.ADD_EQUIPMENT, protect([ROLES.GYM]), upload.single("image"), gymEquipmentController.addEquipment.bind(gymEquipmentController));
router.get(GYM_ROUTE.GET_EQUIPMENTS, protect([ROLES.GYM]), gymEquipmentController.getEquipments.bind(gymEquipmentController));
router.put(GYM_ROUTE.EQUIPMENT_BY_ID, protect([ROLES.GYM]), upload.single("image"), gymEquipmentController.updateEquipment.bind(gymEquipmentController));
router.delete(GYM_ROUTE.EQUIPMENT_BY_ID, protect([ROLES.GYM]), gymEquipmentController.deleteEquipment.bind(gymEquipmentController));



export default router; 