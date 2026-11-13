import { Router } from "express";
import { GYM_ROUTE } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isGymApproved } from "../../../../shared/middleware/gymApproval";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { EnquiryController } from "../controllers/EnquiryController";

export interface EnquiriesRouteControllers {
    enquiryController: EnquiryController;
}

export function createEnquiriesRouter(controllers: EnquiriesRouteControllers): Router {
    const router = Router();
    const { enquiryController } = controllers;

    router.post(GYM_ROUTE.ADD_ENQUIRY, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, enquiryController.addEnquiry.bind(enquiryController));
    router.get(GYM_ROUTE.GET_ENQUIRIES, protect([ROLES.GYM]), enquiryController.getEnquiries.bind(enquiryController));
    router.put(GYM_ROUTE.ENQUIRY_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, enquiryController.updateEnquiry.bind(enquiryController));
    router.delete(GYM_ROUTE.ENQUIRY_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, enquiryController.deleteEnquiry.bind(enquiryController));

    return router;
}
