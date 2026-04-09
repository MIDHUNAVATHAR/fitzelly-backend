import { Request, Response } from "express";
import { AddWeightLogUseCase } from "../../../application/usecases/health-tracking/AddWeightLogUseCase";
import { GetWeightLogsUseCase } from "../../../application/usecases/health-tracking/GetWeightLogsUseCase";

export class HealthTrackingController {
    constructor(
        private addWeightLogUseCase: AddWeightLogUseCase,
        private getWeightLogsUseCase: GetWeightLogsUseCase
    ) {}

    async addWeightLog(req: Request, res: Response): Promise<void> {
        try {
            const clientId = (req as any).user.id;
            const { weight, height, bmi, date } = req.body;
            const log = await this.addWeightLogUseCase.execute({
                clientId,
                weight,
                height,
                bmi,
                date: new Date(date)
            });
            res.status(201).json(log);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getWeightLogs(req: Request, res: Response): Promise<void> {
        try {
            const clientId = (req as any).user.id;
            const logs = await this.getWeightLogsUseCase.execute(clientId);
            res.status(200).json(logs);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
