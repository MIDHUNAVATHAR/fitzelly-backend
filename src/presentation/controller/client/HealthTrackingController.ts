import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { IAddWeightLogUseCase, IGetWeightLogsUseCase } from "../../../application/IUseCases/health-tracking/IWeightLogUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";

export class HealthTrackingController {
    constructor(
        private _addWeightLogUseCase: IAddWeightLogUseCase,
        private _getWeightLogsUseCase: IGetWeightLogsUseCase
    ) {}

    async addWeightLog(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const { weight, height, bmi, date } = req.body;
            const log = await this._addWeightLogUseCase.execute({
                clientId,
                weight,
                height,
                bmi,
                date: new Date(date)
            });
            res.status(HttpStatus.CREATED).json({ status: ResponseStatus.SUCCESS, data: log });
        } catch (error) {
            next(error);
        }
    }

    async getWeightLogs(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const logs = await this._getWeightLogsUseCase.execute(clientId);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: logs });
        } catch (error) {
            next(error);
        }
    }
}

