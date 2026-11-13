import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../../shared/middleware/protect";
import { HttpStatus, ResponseStatus } from "../../../../shared/constants/statusCodes.constants";
import { IGetAvailablePlansUseCase } from "../../application/interfaces/IGetAvailablePlansUseCase";
import { ICreateCheckoutSessionUseCase } from "../../application/interfaces/ICreateCheckoutSessionUseCase";
import { IConfirmSubscriptionUseCase } from "../../application/interfaces/IConfirmSubscriptionUseCase";
import { ResponseMessage } from "../../../../shared/constants/response.constants";


export class SubscriptionController {
    constructor(
        private _getAvailablePlansUseCase: IGetAvailablePlansUseCase,
        private _createCheckoutSessionUseCase: ICreateCheckoutSessionUseCase,
        private _confirmSubscriptionUseCase: IConfirmSubscriptionUseCase,
    ) { }

    async getAvailablePlans(_req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const plans = await this._getAvailablePlansUseCase.execute();
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data: plans
            });
        } catch (error) {
            next(error);
        }
    }

    async createCheckoutSession(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { planId } = req.body;
            const gymId = req.user!.id;
            const gymEmail = req.user!.email;

            const result = await this._createCheckoutSessionUseCase.execute({
                planId,
                gymId,
                gymEmail
            });

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async confirmSubscription(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { sessionId } = req.body;

            await this._confirmSubscriptionUseCase.execute(sessionId);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.PAYMENT_VERIFIED_SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }
}
