import { Router } from "express";
import multer from "multer";
import { GYM_ROUTE, TRAINER_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isGymApproved } from "../../../../shared/middleware/gymApproval";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { GymTrainerController } from "../controllers/GymTrainerController";
import { TrainerProfileController } from "../controllers/TrainerProfileController";

const upload = multer();

export interface TrainersRouteControllers {
    gymTrainerController: GymTrainerController;
    trainerProfileController: TrainerProfileController;
}

export function createTrainersRouter(controllers: TrainersRouteControllers): Router {
    const router = Router();
    const { gymTrainerController, trainerProfileController } = controllers;

    // Gym - Trainer management
    router.post(GYM_ROUTE.ADD_TRAINER, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, upload.array("certificates"), gymTrainerController.addTrainer.bind(gymTrainerController));
    router.get(GYM_ROUTE.GET_TRAINERS, protect([ROLES.GYM]), gymTrainerController.getTrainers.bind(gymTrainerController));
    router.get(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), gymTrainerController.getTrainerById.bind(gymTrainerController));
    router.put(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, upload.array("certificates"), gymTrainerController.updateTrainer.bind(gymTrainerController));
    router.delete(GYM_ROUTE.TRAINER_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymTrainerController.deleteTrainer.bind(gymTrainerController));
    router.post(GYM_ROUTE.TRAINER_INVITE, protect([ROLES.GYM]), isGymApproved, gymTrainerController.sendWelcomeEmail.bind(gymTrainerController));

    // Trainer Portal - Profile & Assigned Clients
    router.get(TRAINER_ROUTES.TRAINER_PROFILE, protect([ROLES.TRAINER]), isSubscriptionActive, trainerProfileController.getTrainerProfile.bind(trainerProfileController));
    router.patch(TRAINER_ROUTES.TRAINER_PROFILE, protect([ROLES.TRAINER]), isSubscriptionActive, trainerProfileController.updateTrainerProfile.bind(trainerProfileController));
    router.post(TRAINER_ROUTES.TRAINER_PROFILE_IMAGE, protect([ROLES.TRAINER]), isSubscriptionActive, upload.single("profilePhoto"), trainerProfileController.uploadTrainerProfileImage.bind(trainerProfileController));
    router.get(TRAINER_ROUTES.TRAINER_GYM_DETAILS, protect([ROLES.TRAINER]), isSubscriptionActive, trainerProfileController.getTrainerGymDetails.bind(trainerProfileController));
    router.get(TRAINER_ROUTES.TRAINER_CLIENTS, protect([ROLES.TRAINER]), isSubscriptionActive, trainerProfileController.getAssignedClients.bind(trainerProfileController));
    router.get(TRAINER_ROUTES.TRAINER_CLIENT_VIEW, protect([ROLES.TRAINER]), isSubscriptionActive, trainerProfileController.getAssignedClientById.bind(trainerProfileController));

    return router;
}
