import { Router } from "express";
import { GYM_ROUTE, TRAINER_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isGymApproved } from "../../../../shared/middleware/gymApproval";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { ExpenseController } from "../controllers/ExpenseController";
import { TrainerPayoutController } from "../controllers/TrainerPayoutController";

export interface PaymentsRouteControllers {
    expenseController: ExpenseController;
    trainerPayoutController: TrainerPayoutController;
}

export function createPaymentsRouter(controllers: PaymentsRouteControllers): Router {
    const router = Router();
    const { expenseController, trainerPayoutController } = controllers;

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
    router.get(TRAINER_ROUTES.TRAINER_EARNINGS, protect([ROLES.TRAINER]), isSubscriptionActive, trainerPayoutController.getEarningsForTrainer.bind(trainerPayoutController));

    return router;
}
