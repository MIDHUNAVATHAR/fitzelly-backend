import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../../shared/middleware/protect";
import { IGetSuperAdminDashboardUseCase } from "../../application/interfaces/ISuperAdminDashboardUseCases";
import { HttpStatus, ResponseStatus } from "../../../../shared/constants/statusCodes.constants";
import { ResponseMessage } from "../../../../shared/constants/response.constants";


export class SuperAdminDashboardController {
    constructor(private _getSuperAdminDashboardUseCase: IGetSuperAdminDashboardUseCase) { }

    async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const data = await this._getSuperAdminDashboardUseCase.execute();
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message:ResponseMessage.SUPER_ADMIN_DASHBOARD_FETCH_SUCCESS,
                data
            });
        } catch (error) {
            next(error);
        }
    }
}