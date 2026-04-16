import { Response } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { AddWeightLogUseCase } from "../../../application/usecases/health-tracking/AddWeightLogUseCase";
import { GetWeightLogsUseCase } from "../../../application/usecases/health-tracking/GetWeightLogsUseCase";

export class HealthTrackingController {
    constructor(
        private addWeightLogUseCase: AddWeightLogUseCase,
        private getWeightLogsUseCase: GetWeightLogsUseCase
    ) {}

    async addWeightLog(req: AuthRequest, res: Response): Promise<void> {
        try {
            const clientId = req.user!.id;
            const { weight, height, bmi, date } = req.body;
            const log = await this.addWeightLogUseCase.execute({
                clientId,
                weight,
                height,
                bmi,
                date: new Date(date)
            });
            res.status(201).json(log);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An error occurred";
            res.status(400).json({ message });
        }
    }

    async getWeightLogs(req: AuthRequest, res: Response): Promise<void> {
        try {
            const clientId = req.user!.id;
            const logs = await this.getWeightLogsUseCase.execute(clientId);
            res.status(200).json(logs);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An error occurred";
            res.status(400).json({ message });
        }
    }
}
