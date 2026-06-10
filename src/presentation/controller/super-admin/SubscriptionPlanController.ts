import { Request, Response, NextFunction } from "express";
import { 
    IAddSubscriptionPlanUseCase, 
    IGetAllSubscriptionPlansUseCase, 
    IUpdateSubscriptionPlanUseCase, 
    IDeleteSubscriptionPlanUseCase 
} from "../../../application/IUseCases/superAdmin-plans/ISubscriptionPlanUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";

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
                message: ResponseMessage.SUBSCRIPTION_PLAN_CREATE_SUCCESS,
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
                message: ResponseMessage.SUBSCRIPTION_PLANS_FETCH_SUCCESS,
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
                message: ResponseMessage.SUBSCRIPTION_PLAN_UPDATE_SUCCESS,
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
                message: ResponseMessage.SUBSCRIPTION_PLAN_DELETE_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }
}
