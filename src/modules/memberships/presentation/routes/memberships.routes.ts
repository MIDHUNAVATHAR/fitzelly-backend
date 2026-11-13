import { Router } from "express";
import { GYM_ROUTE } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isGymApproved } from "../../../../shared/middleware/gymApproval";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { GymPlanController } from "../controllers/GymPlanController";
import { GymMembershipController } from "../controllers/GymMembershipController";

export interface MembershipsRouteControllers {
    gymPlanController: GymPlanController;
    gymMembershipController: GymMembershipController;
}

export function createMembershipsRouter(controllers: MembershipsRouteControllers): Router {
    const router = Router();
    const { gymPlanController, gymMembershipController } = controllers;

    // Plans
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

    // Payments under memberships
    router.get(GYM_ROUTE.GET_PAYMENTS, protect([ROLES.GYM]), gymMembershipController.getPayments.bind(gymMembershipController));
    router.post(GYM_ROUTE.ADD_PAYMENT, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.addPayment.bind(gymMembershipController));
    router.patch(GYM_ROUTE.PAYMENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.updatePayment.bind(gymMembershipController));
    router.delete(GYM_ROUTE.PAYMENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymMembershipController.deletePayment.bind(gymMembershipController));

    return router;
}
