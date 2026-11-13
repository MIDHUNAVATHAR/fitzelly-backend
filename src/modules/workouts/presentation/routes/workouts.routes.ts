import { Router } from "express";
import { TRAINER_ROUTES, SUPER_ADMIN_ROUTES, CLIENT_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { WorkoutLibraryController } from "../controllers/WorkoutLibraryController";
import { WorkoutTemplateController } from "../controllers/WorkoutTemplateController";
import { TrainerWorkoutPlanController } from "../controllers/TrainerWorkoutPlanController";
import { ClientWorkoutPlanController } from "../controllers/ClientWorkoutPlanController";

export interface WorkoutsRouteControllers {
    workoutLibraryController: WorkoutLibraryController;
    workoutTemplateController: WorkoutTemplateController;
    trainerWorkoutPlanController: TrainerWorkoutPlanController;
    clientWorkoutPlanController: ClientWorkoutPlanController;
}

export function createWorkoutsRouter(controllers: WorkoutsRouteControllers): Router {
    const router = Router();
    const {
        workoutLibraryController,
        workoutTemplateController,
        trainerWorkoutPlanController,
        clientWorkoutPlanController,
    } = controllers;

    // Workout Library
    router.get(TRAINER_ROUTES.GET_EXERCISES, protect([ROLES.TRAINER, ROLES.GYM]), isSubscriptionActive, workoutLibraryController.getExercises.bind(workoutLibraryController));

    router.route(SUPER_ADMIN_ROUTES.WORKOUT_LIBRARY)
        .all(protect([ROLES.SUPERADMIN]))
        .get(workoutLibraryController.getExercises.bind(workoutLibraryController))
        .post(workoutLibraryController.createExercise.bind(workoutLibraryController));

    router.route(SUPER_ADMIN_ROUTES.WORKOUT_LIBRARY_BY_ID)
        .all(protect([ROLES.SUPERADMIN]))
        .patch(workoutLibraryController.updateExercise.bind(workoutLibraryController))
        .delete(workoutLibraryController.deleteExercise.bind(workoutLibraryController));

    // Workout Templates
    router.post(TRAINER_ROUTES.ADD_TEMPLATE, protect([ROLES.TRAINER]), isSubscriptionActive, workoutTemplateController.createTemplate.bind(workoutTemplateController));
    router.get(TRAINER_ROUTES.GET_TEMPLATES, protect([ROLES.TRAINER]), isSubscriptionActive, workoutTemplateController.getTemplates.bind(workoutTemplateController));
    router.delete(TRAINER_ROUTES.DELETE_TEMPLATE, protect([ROLES.TRAINER]), isSubscriptionActive, workoutTemplateController.deleteTemplate.bind(workoutTemplateController));
    router.post(TRAINER_ROUTES.ASSIGN_TEMPLATE, protect([ROLES.TRAINER]), isSubscriptionActive, workoutTemplateController.assignTemplate.bind(workoutTemplateController));

    // Workout Plans (Trainer)
    router.post(TRAINER_ROUTES.TRAINER_WORKOUT_PLAN, protect([ROLES.TRAINER]), isSubscriptionActive, trainerWorkoutPlanController.createOrUpdatePlan.bind(trainerWorkoutPlanController));
    router.get(TRAINER_ROUTES.TRAINER_WORKOUT_PLAN, protect([ROLES.TRAINER]), isSubscriptionActive, trainerWorkoutPlanController.getClientPlan.bind(trainerWorkoutPlanController));

    // Workout Plans (Client)
    router.get(CLIENT_ROUTES.CLIENT_WORKOUT_PLAN, protect([ROLES.CLIENT]), isSubscriptionActive, clientWorkoutPlanController.getMyPlan.bind(clientWorkoutPlanController));
    router.post(CLIENT_ROUTES.CLIENT_WORKOUT_PROGRESS, protect([ROLES.CLIENT]), isSubscriptionActive, clientWorkoutPlanController.trackProgress.bind(clientWorkoutPlanController));
    router.get(CLIENT_ROUTES.CLIENT_WORKOUT_PROGRESS, protect([ROLES.CLIENT]), isSubscriptionActive, clientWorkoutPlanController.getProgress.bind(clientWorkoutPlanController));
    router.get(CLIENT_ROUTES.CLIENT_WORKOUT_STREAK, protect([ROLES.CLIENT]), isSubscriptionActive, clientWorkoutPlanController.getStreak.bind(clientWorkoutPlanController));

    return router;
}
