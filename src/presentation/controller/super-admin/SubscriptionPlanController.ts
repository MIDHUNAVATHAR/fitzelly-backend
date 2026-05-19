import { Request, Response, NextFunction } from "express";
import { 
    IAddSubscriptionPlanUseCase, 
    IGetAllSubscriptionPlansUseCase, 
    IUpdateSubscriptionPlanUseCase, 
    IDeleteSubscriptionPlanUseCase 
} from "../../../application/IUseCases/superAdmin-plans/ISubscriptionPlanUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";

export class SubscriptionPlanController {
    constructor(
        private _addUseCase: IAddSubscriptionPlanUseCase,
        private _getAllUseCase: IGetAllSubscriptionPlansUseCase,
        private _updateUseCase: IUpdateSubscriptionPlanUseCase,
        private _deleteUseCase: IDeleteSubscriptionPlanUseCase
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this._addUseCase.execute(req.body);
            res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: "Subscription plan created successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this._getAllUseCase.execute();
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const result = await this._updateUseCase.execute(id, req.body);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Subscription plan updated successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await this._deleteUseCase.execute(id);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Subscription plan deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
