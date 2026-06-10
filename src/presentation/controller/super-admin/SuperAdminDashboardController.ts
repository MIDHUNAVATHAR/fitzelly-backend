import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { IGetSuperAdminDashboardUseCase } from "../../../application/IUseCases/superAdmin-dashboard/ISuperAdminDashboardUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";



export class SuperAdminDashboardController {
    constructor(private _getSuperAdminDashboardUseCase: IGetSuperAdminDashboardUseCase) { }

    async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const data = await this._getSuperAdminDashboardUseCase.execute();
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data
            });
        } catch (error) {
            next(error);
        }
    }
}