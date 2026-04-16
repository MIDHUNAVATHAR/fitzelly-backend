import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { GetGymAnalyticsUseCase } from "../../../application/usecases/gym-analytics/GetGymAnalyticsUseCase";

export class GymAnalyticsController {
    constructor(private getGymAnalyticsUseCase: GetGymAnalyticsUseCase) { }

    async getAnalytics(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });

            const analytics = await this.getGymAnalyticsUseCase.execute(gymId);
            res.status(200).json({ success: true, data: analytics });
        } catch (error) {
            console.error("GymAnalyticsController Error: ", error);
            next(error);
        }
    }
}
