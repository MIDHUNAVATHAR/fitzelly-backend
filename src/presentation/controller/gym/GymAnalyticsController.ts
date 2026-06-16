import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { IGetGymAnalyticsUseCase } from "../../../application/IUseCases/gym-analytics/IGymAnalyticsUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";

export class GymAnalyticsController {
    constructor(
        private _getGymAnalyticsUseCase: IGetGymAnalyticsUseCase
    ) { }

    async getAnalytics(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED
            });

            const analytics = await this._getGymAnalyticsUseCase.execute(gymId);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message:ResponseMessage.GYM_ANALYTICS_FETCH_SUCCESS,
                data: analytics });
        } catch (error) {
            next(error);
        }
    }
}

