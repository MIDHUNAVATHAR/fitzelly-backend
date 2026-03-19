import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { IAddExpenseUseCase, IGetExpensesUseCase, IUpdateExpenseUseCase, IDeleteExpenseUseCase } from "../../../application/IUseCases/expense/IExpenseUseCases";

export class ExpenseController {
    constructor(
        private _addExpenseUseCase: IAddExpenseUseCase,
        private _getExpensesUseCase: IGetExpensesUseCase,
        private _updateExpenseUseCase: IUpdateExpenseUseCase,
        private _deleteExpenseUseCase: IDeleteExpenseUseCase
    ) { }

    async addExpense(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const result = await this._addExpenseUseCase.execute(gymId, req.body);
            return res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: "Expense added successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getExpenses(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const { page = 1, limit = 10, category, startDate, endDate } = req.query;

            const result = await this._getExpensesUseCase.execute(
                gymId,
                Number(page),
                Number(limit),
                category as string,
                startDate ? new Date(startDate as string) : undefined,
                endDate ? new Date(endDate as string) : undefined
            );

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Expenses fetched successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async updateExpense(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const result = await this._updateExpenseUseCase.execute(id, req.body);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Expense updated successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteExpense(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await this._deleteExpenseUseCase.execute(id);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Expense deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
