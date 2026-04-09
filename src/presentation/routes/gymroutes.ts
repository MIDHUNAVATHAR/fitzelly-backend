
import { Router } from "express";
import { GYM_ROUTE } from "../../constants/routes.constants";
import { gymAuthenticationController } from "../../main/controllers.di";
import { gymProfileController } from "../../main/controllers.di";
import { gymClientController } from "../../main/controllers.di";
import { gymTrainerController } from "../../main/controllers.di";
import { gymPlanController } from "../../main/controllers.di";
import { gymEquipmentController } from "../../main/controllers.di";
import { gymMembershipController } from "../../main/controllers.di";
import { enquiryController } from "../../main/controllers.di";
import { expenseController } from "../../main/controllers.di";
import { trainerPayoutController } from "../../main/controllers.di";
import { gymAnalyticsController } from "../../main/controllers.di";
import { dashboardController } from "../../main/controllers.di";
import { notificationController } from "../../main/controllers.di";




import { validateRequest } from "../validator/validateRequest";
import { allFieldsMin3Schema } from "../validator/minLength.schema";
import { protect } from "../middlewares/protect";
import { isGymApproved } from "../middlewares/gymApproval";
import { isSubscriptionActive } from "../middlewares/gymSubscription";
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
router.post(GYM_ROUTE.GYM_CERTIFICATE, protect([ROLES.GYM]), upload.single("certificate"), gymProfileController.uploadCertificate.bind(gymProfileController));
router.delete(GYM_ROUTE.DELETE_GYM_CERTIFICATE, protect([ROLES.GYM]), gymProfileController.deleteCertificate.bind(gymProfileController));
router.post(GYM_ROUTE.RE_APPLY, protect([ROLES.GYM]), gymProfileController.reApply.bind(gymProfileController));

router.post(GYM_ROUTE.ADD_CLIENT, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymClientController.addClient.bind(gymClientController));
router.get(GYM_ROUTE.GET_CLIENTS, protect([ROLES.GYM]), gymClientController.getClients.bind(gymClientController))
router.get(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), gymClientController.getClientById.bind(gymClientController));
router.put(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymClientController.updateClient.bind(gymClientController));
router.delete(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymClientController.DeleteClientUseCase.bind(gymClientController))

router.post(GYM_ROUTE.ADD_TRAINER, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, upload.array("certificates"), gymTrainerController.addTrainer.bind(gymTrainerController));
router.get(GYM_ROUTE.GET_TRAINERS, protect([ROLES.GYM]), gymTrainerController.getTrainers.bind(gymTrainerController));
router.get(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), gymTrainerController.getTrainerById.bind(gymTrainerController))
router.put(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, upload.array("certificates"), gymTrainerController.updateTrainer.bind(gymTrainerController))
router.delete(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymTrainerController.deleteTrainer.bind(gymTrainerController))


router.post(GYM_ROUTE.ADD_PLAN, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymPlanController.addPlan.bind(gymPlanController));
router.get(GYM_ROUTE.GET_PLANS, protect([ROLES.GYM]), gymPlanController.getPlans.bind(gymPlanController));
router.patch(GYM_ROUTE.UPDATE_PLAN, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymPlanController.updatePlan.bind(gymPlanController));
router.delete(GYM_ROUTE.DELETE_PLAN, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymPlanController.deletePlan.bind(gymPlanController));


// Memberships
router.post(GYM_ROUTE.ADD_MEMBERSHIP, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.addMembership.bind(gymMembershipController));
router.get(GYM_ROUTE.GET_MEMBERSHIPS, protect([ROLES.GYM]), gymMembershipController.getMemberships.bind(gymMembershipController));
router.get(GYM_ROUTE.MEMBERSHIP_BY_ID, protect([ROLES.GYM]), gymMembershipController.getMembershipById.bind(gymMembershipController));
router.patch(GYM_ROUTE.MEMBERSHIP_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.updateMembership.bind(gymMembershipController));
router.delete(GYM_ROUTE.MEMBERSHIP_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.deleteMembership.bind(gymMembershipController));

// Payments
router.get(GYM_ROUTE.GET_PAYMENTS, protect([ROLES.GYM]), gymMembershipController.getPayments.bind(gymMembershipController));
router.post(GYM_ROUTE.ADD_PAYMENT, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.addPayment.bind(gymMembershipController));
router.patch(GYM_ROUTE.PAYMENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.updatePayment.bind(gymMembershipController));
router.delete(GYM_ROUTE.PAYMENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.deletePayment.bind(gymMembershipController));

// Equipments
router.post(GYM_ROUTE.ADD_EQUIPMENT, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, upload.single("image"), gymEquipmentController.addEquipment.bind(gymEquipmentController));
router.get(GYM_ROUTE.GET_EQUIPMENTS, protect([ROLES.GYM, ROLES.CLIENT, ROLES.TRAINER]), gymEquipmentController.getEquipments.bind(gymEquipmentController));
router.put(GYM_ROUTE.EQUIPMENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, upload.single("image"), gymEquipmentController.updateEquipment.bind(gymEquipmentController));
router.delete(GYM_ROUTE.EQUIPMENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymEquipmentController.deleteEquipment.bind(gymEquipmentController));

// Enquiries
router.post(GYM_ROUTE.ADD_ENQUIRY, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, enquiryController.addEnquiry.bind(enquiryController));
router.get(GYM_ROUTE.GET_ENQUIRIES, protect([ROLES.GYM]), enquiryController.getEnquiries.bind(enquiryController));
router.put(GYM_ROUTE.ENQUIRY_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, enquiryController.updateEnquiry.bind(enquiryController));
router.delete(GYM_ROUTE.ENQUIRY_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, enquiryController.deleteEnquiry.bind(enquiryController));

// Expenses
router.post(GYM_ROUTE.ADD_EXPENSE, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, expenseController.addExpense.bind(expenseController));
router.get(GYM_ROUTE.GET_EXPENSES, protect([ROLES.GYM]), expenseController.getExpenses.bind(expenseController));
router.put(GYM_ROUTE.EXPENSE_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, expenseController.updateExpense.bind(expenseController));
router.delete(GYM_ROUTE.EXPENSE_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, expenseController.deleteExpense.bind(expenseController));

// Trainer Payouts
router.post(GYM_ROUTE.ADD_TRAINER_PAYOUT, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, trainerPayoutController.addPayout.bind(trainerPayoutController));
router.get(GYM_ROUTE.GET_TRAINER_PAYOUTS, protect([ROLES.GYM]), trainerPayoutController.getPayouts.bind(trainerPayoutController));
router.put(GYM_ROUTE.TRAINER_PAYOUT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, trainerPayoutController.updatePayout.bind(trainerPayoutController));
router.delete(GYM_ROUTE.TRAINER_PAYOUT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, trainerPayoutController.deletePayout.bind(trainerPayoutController));

// Analytics
router.get(GYM_ROUTE.GET_ANALYTICS, protect([ROLES.GYM]), gymAnalyticsController.getAnalytics.bind(gymAnalyticsController));

// Dashboard
router.get(GYM_ROUTE.GET_DASHBOARD, protect([ROLES.GYM]), dashboardController.getDashboard.bind(dashboardController));

// Notifications
router.get(GYM_ROUTE.NOTIFICATIONS_UNREAD, protect([ROLES.GYM, ROLES.SUPERADMIN, ROLES.CLIENT, ROLES.TRAINER]), notificationController.getUnread.bind(notificationController));
router.get(GYM_ROUTE.NOTIFICATIONS_READ, protect([ROLES.GYM, ROLES.SUPERADMIN, ROLES.CLIENT, ROLES.TRAINER]), notificationController.getRead.bind(notificationController));
router.patch(GYM_ROUTE.MARK_ALL_NOTIFICATIONS_READ, protect([ROLES.GYM, ROLES.SUPERADMIN, ROLES.CLIENT, ROLES.TRAINER]), isGymApproved, notificationController.markAllAsRead.bind(notificationController));
router.patch(GYM_ROUTE.MARK_NOTIFICATION_READ, protect([ROLES.GYM, ROLES.SUPERADMIN, ROLES.CLIENT, ROLES.TRAINER]), isGymApproved, notificationController.markAsRead.bind(notificationController));

export default router;