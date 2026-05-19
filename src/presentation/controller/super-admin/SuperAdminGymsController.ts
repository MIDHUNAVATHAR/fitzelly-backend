import { Request, Response, NextFunction } from "express";
import { IGetAllGymsUseCase } from "../../../application/IUseCases/superAd-gym-listing/IGetAllGymsUseCase";
import { IGetGymByIdUseCase } from "../../../application/IUseCases/gym-profile/IGetGymByIdUseCase";

import { IApproveGymUseCase } from "../../../application/IUseCases/superAd-gym-listing/IApproveGymUseCase";
import { IRejectGymUseCase } from "../../../application/IUseCases/superAd-gym-listing/IRejectGymUseCase";
import { IUpdateGymSubscriptionUseCase } from "../../../application/IUseCases/superAd-gym-listing/IUpdateGymSubscriptionUseCase";
import { ResponseStatus, HttpStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";
import { logger } from "../../../infrastructure/logger/logger";

export class SuperAdminGymsController {
    constructor(
        private _getAllGymsUseCase: IGetAllGymsUseCase,
        private _getGymByIdUseCase: IGetGymByIdUseCase,
        private _approveGymUseCase: IApproveGymUseCase,
        private _rejectGymUseCase: IRejectGymUseCase,
        private _updateGymSubscriptionUseCase: IUpdateGymSubscriptionUseCase,
    ) { }

    async getAllGyms(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const search = (req.query.search as string) || "";
            const status = (req.query.status as string) || "all";

            const result = await this._getAllGymsUseCase.execute(page, limit, search, status);

            res.status(HttpStatus.OK).json({
                success: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYMS_FETCH_SUCCESS,
                data: result
            })

        } catch (error) {
            next(error)
        }
    }

    async getGymById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.params.gymId as string;
            const gym = await this._getGymByIdUseCase.execute(gymId);

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYM_FETCH_SUCCESS,
                data: gym
            })
        } catch (error) {
            next(error)
        }
    }

   
   

    async approveGym(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const gymId = req.params.gymId as string;
            
            const updatedGym = await this._approveGymUseCase.execute(gymId);
            logger.info("updated gym ", updatedGym)

            res.status(HttpStatus.OK).json({
                success: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYM_UPDATE_SUCCESS,
                data: updatedGym
            })
        } catch (error) {
            next(error)
        }
    }

    async rejectGym(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.params.gymId as string;
            const { rejectionReason } = req.body;
            
            if (!rejectionReason) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: ResponseStatus.ERROR,
                    message: "Rejection reason is required"
                });
                return;
            }

            const updatedGym = await this._rejectGymUseCase.execute(gymId, rejectionReason);
            logger.info("rejected gym ", updatedGym)

            res.status(HttpStatus.OK).json({
                success: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYM_UPDATE_SUCCESS,
                data: updatedGym
            })
        } catch (error) {
            next(error)
        }
    }

    async updateSubscription(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.params.gymId as string;
            const { subscriptionStatus, expiryDate } = req.body;

            const updatedGym = await this._updateGymSubscriptionUseCase.execute(
                gymId,
                subscriptionStatus,
                new Date(expiryDate)
            );

            res.status(HttpStatus.OK).json({
                success: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYM_UPDATE_SUCCESS,
                data: updatedGym
            })
        } catch (error) {
            next(error)
        }
    }
}