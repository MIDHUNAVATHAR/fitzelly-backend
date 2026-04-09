import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { GetSuperAdminDashboardUseCase } from "../../../application/usecases/superAdmin-dashboard/GetSuperAdminDashboardUseCase";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";

export class SuperAdminDashboardController {
    constructor(private getSuperAdminDashboardUseCase: GetSuperAdminDashboardUseCase) { }

    async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const data = await this.getSuperAdminDashboardUseCase.execute();
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data
            });
        } catch (error) {
            console.error("SuperAdminDashboardController Error:", error);
            next(error);
        }
    }
}
