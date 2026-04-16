import { Request, Response, NextFunction } from "express";
import { AddSubscriptionPlanUseCase, GetAllSubscriptionPlansUseCase, UpdateSubscriptionPlanUseCase, DeleteSubscriptionPlanUseCase } from "../../../application/usecases/superAdmin-plans/SubscriptionPlanUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";

export class SubscriptionPlanController {
    constructor(
        private addUseCase: AddSubscriptionPlanUseCase,
        private getAllUseCase: GetAllSubscriptionPlansUseCase,
        private updateUseCase: UpdateSubscriptionPlanUseCase,
        private deleteUseCase: DeleteSubscriptionPlanUseCase
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.addUseCase.execute(req.body);
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
            const result = await this.getAllUseCase.execute();
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
            const result = await this.updateUseCase.execute(id, req.body);
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
            await this.deleteUseCase.execute(id);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Subscription plan deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
