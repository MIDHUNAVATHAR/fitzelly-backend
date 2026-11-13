import { PaymentRepository } from "./infrastructure/repositories/PaymentRepository";
import { ExpenseRepository } from "./infrastructure/repositories/ExpenseRepository";
import { TrainerPayoutRepository } from "./infrastructure/repositories/TrainerPayoutRepository";

import {
    AddExpenseUseCase,
    GetExpensesUseCase,
    UpdateExpenseUseCase,
    DeleteExpenseUseCase,
} from "./application/use-cases/ExpenseUseCases";

import {
    AddTrainerPayoutUseCase,
    GetTrainerPayoutsUseCase,
    UpdateTrainerPayoutUseCase,
    DeleteTrainerPayoutUseCase,
    GetTrainerEarningsUseCase,
} from "./application/use-cases/TrainerPayoutUseCases";

import { ExpenseController } from "./presentation/controllers/ExpenseController";
import { TrainerPayoutController } from "./presentation/controllers/TrainerPayoutController";
import { createPaymentsRouter } from "./presentation/routes/payments.routes";

import { ITrainerRepository } from "../trainers/domain/repositories/ITrainerRepository";

export interface PaymentsModuleDependencies {
    trainerRepository: ITrainerRepository;
    paymentRepository?: PaymentRepository;
    expenseRepository?: ExpenseRepository;
    trainerPayoutRepository?: TrainerPayoutRepository;
}

export function initPaymentsModule(deps: PaymentsModuleDependencies) {
    const paymentRepository = deps.paymentRepository ?? new PaymentRepository();
    const expenseRepository = deps.expenseRepository ?? new ExpenseRepository();
    const trainerPayoutRepository = deps.trainerPayoutRepository ?? new TrainerPayoutRepository();

    const addExpenseUseCase = new AddExpenseUseCase(expenseRepository);
    const getExpensesUseCase = new GetExpensesUseCase(expenseRepository);
    const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);
    const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);

    const addTrainerPayoutUseCase = new AddTrainerPayoutUseCase(trainerPayoutRepository);
    const getTrainerPayoutsUseCase = new GetTrainerPayoutsUseCase(trainerPayoutRepository, deps.trainerRepository);
    const updateTrainerPayoutUseCase = new UpdateTrainerPayoutUseCase(trainerPayoutRepository);
    const deleteTrainerPayoutUseCase = new DeleteTrainerPayoutUseCase(trainerPayoutRepository);
    const getTrainerEarningsUseCase = new GetTrainerEarningsUseCase(trainerPayoutRepository);

    const expenseController = new ExpenseController(
        addExpenseUseCase,
        getExpensesUseCase,
        updateExpenseUseCase,
        deleteExpenseUseCase
    );

    const trainerPayoutController = new TrainerPayoutController(
        addTrainerPayoutUseCase,
        getTrainerPayoutsUseCase,
        updateTrainerPayoutUseCase,
        deleteTrainerPayoutUseCase,
        getTrainerEarningsUseCase
    );

    const router = createPaymentsRouter({
        expenseController,
        trainerPayoutController,
    });

    return {
        router,
        repositories: {
            paymentRepository,
            expenseRepository,
            trainerPayoutRepository,
        },
        controllers: {
            expenseController,
            trainerPayoutController,
        },
        useCases: {
            addExpenseUseCase,
            getExpensesUseCase,
            updateExpenseUseCase,
            deleteExpenseUseCase,
            addTrainerPayoutUseCase,
            getTrainerPayoutsUseCase,
            updateTrainerPayoutUseCase,
            deleteTrainerPayoutUseCase,
            getTrainerEarningsUseCase,
        },
    };
}
