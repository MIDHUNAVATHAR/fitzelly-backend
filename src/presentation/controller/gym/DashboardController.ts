import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { IGetGymDashboardUseCase } from "../../../application/IUseCases/gym-dashboard/IGymDashboardUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";

export class DashboardController {
    constructor(private _getGymDashboardUseCase: IGetGymDashboardUseCase) { }

    async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED
            });

            const data = await this._getGymDashboardUseCase.execute(gymId);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message:ResponseMessage.GYM_DASHBOARD_FETCH_SUCCESS,
                data });
        } catch (error) {
            next(error);
        }
    }
}