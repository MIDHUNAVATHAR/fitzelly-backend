import { Router } from "express";
import multer from "multer";
import { GYM_ROUTE, CLIENT_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isGymApproved } from "../../../../shared/middleware/gymApproval";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { validateRequest } from "../../../../shared/middleware/validateRequest";
import { allFieldsMin3Schema } from "../../../../shared/middleware/minLength.schema";
import { GymClientController } from "../controllers/GymClientController";
import { ClientProfileController } from "../controllers/ClientProfileController";

const upload = multer();

export interface ClientsRouteControllers {
    gymClientController: GymClientController;
    clientProfileController: ClientProfileController;
}

export function createClientsRouter(controllers: ClientsRouteControllers): Router {
    const router = Router();
    const { gymClientController, clientProfileController } = controllers;

    // Gym - Client management
    router.post(GYM_ROUTE.ADD_CLIENT, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymClientController.addClient.bind(gymClientController));
    router.get(GYM_ROUTE.GET_CLIENTS, protect([ROLES.GYM]), gymClientController.getClients.bind(gymClientController));
    router.get(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), gymClientController.getClientById.bind(gymClientController));
    router.put(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymClientController.updateClient.bind(gymClientController));
    router.delete(GYM_ROUTE.CLIENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymClientController.DeleteClientUseCase.bind(gymClientController));
    router.post(GYM_ROUTE.CLIENT_INVITE, protect([ROLES.GYM]), isGymApproved, gymClientController.sendWelcomeEmail.bind(gymClientController));

    // Client Portal - Profile & Gym/Trainer details
    router.get(CLIENT_ROUTES.CLIENT_PROFILE, protect([ROLES.CLIENT]), isSubscriptionActive, clientProfileController.getClientProfile.bind(clientProfileController));
    router.patch(CLIENT_ROUTES.CLIENT_PROFILE, protect([ROLES.CLIENT]), isSubscriptionActive, validateRequest(allFieldsMin3Schema), clientProfileController.updateClientProfile.bind(clientProfileController));
    router.post(CLIENT_ROUTES.CLIENT_PROFILE_IMAGE, protect([ROLES.CLIENT]), isSubscriptionActive, upload.single("profileImage"), clientProfileController.uploadClientProfileImage.bind(clientProfileController));
    router.get(CLIENT_ROUTES.CLIENT_GYM_DETAILS, protect([ROLES.CLIENT]), isSubscriptionActive, clientProfileController.getClientGymDetails.bind(clientProfileController));
    router.get(CLIENT_ROUTES.CLIENT_TRAINER_VIEW, protect([ROLES.CLIENT]), isSubscriptionActive, clientProfileController.getClientAssignedTrainer.bind(clientProfileController));

    return router;
}
