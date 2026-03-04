import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import {HttpStatus,ResponseStatus} from "../../../constants/statusCodes.constants"
import { ResponseMessage } from "../../../constants/response.constants";

import { IAddPlanUseCase } from "../../../application/IUseCases/gym-plans/IAddPlanUseCase";
import { IGetPlansUseCase } from "../../../application/IUseCases/gym-plans/IGetPlansUseCase";
import { IUpdatePlanUseCase } from "../../../application/IUseCases/gym-plans/IUpdatePlanUseCase";
import { IDeletePlanUseCase } from "../../../application/IUseCases/gym-plans/IDeletePlanUseCase";

export class GymPlanController {
    constructor(
        private _addPlanUseCase: IAddPlanUseCase,
        private _getPlansUseCase: IGetPlansUseCase,
        private _updatePlanUseCase: IUpdatePlanUseCase,
        private _deletePlanUseCase: IDeletePlanUseCase
    ) { }

    async addPlan(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const data = { ...req.body, gymId: gymId };

            const newPlan = await this._addPlanUseCase.execute(data);

            return res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.PLAN_ADD_SUCCESS,
                data: newPlan
            });
        } catch (error) {
            next(error);
        }
    }

    async getPlans(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const plans = await this._getPlansUseCase.execute(gymId);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_RETRIVE_SUCCESS,
                data: plans
            });
        } catch (error) {
            next(error);
        }
    }

    async updatePlan(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const planId = req.params.planId as string;
            const data = req.body;

            const updatedPlan = await this._updatePlanUseCase.execute(planId, gymId, data);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_UPDATE_SUCCESS,
                data: updatedPlan
            });
        } catch (error) {
            next(error);
        }
    }

    async deletePlan(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const planId = req.params.planId as string;

            await this._deletePlanUseCase.execute(planId, gymId);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.PLAN_DELETE_SUCCESS,
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}
