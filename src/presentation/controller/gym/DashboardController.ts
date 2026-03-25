import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { GetGymDashboardUseCase } from "../../../application/usecases/gym-dashboard/GetGymDashboardUseCase";

export class DashboardController {
    constructor(private getGymDashboardUseCase: GetGymDashboardUseCase) { }

    async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });

            const data = await this.getGymDashboardUseCase.execute(gymId);
            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error("DashboardController Error:", error);
            next(error);
        }
    }
}
