import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { IAddExpenseUseCase, IGetExpensesUseCase, IUpdateExpenseUseCase, IDeleteExpenseUseCase } from "../../../application/IUseCases/expense/IExpenseUseCases";
import { ResponseMessage } from "../../../constants/response.constants";


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
                message: ResponseMessage.EXPENSE_ADD_SUCCESS,
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
                message: ResponseMessage.EXPENSES_FETCH_SUCCESS,
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
                message: ResponseMessage.EXPENSE_UPDATE_SUCCESS,
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
                message: ResponseMessage.EXPENSE_DELETE_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }
}
