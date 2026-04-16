import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { SaveCallHistoryUseCase, GetUserCallHistoryUseCase } from "../../../application/usecases/chat/CallHistoryUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";

export class CallHistoryController {
    constructor(
        private saveCallHistoryUseCase: SaveCallHistoryUseCase,
        private getUserCallHistoryUseCase: GetUserCallHistoryUseCase
    ) { }

    async saveHistory(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const historyData = req.body;
            // Ensure startTime and endTime are Date objects if they come as strings
            if (historyData.startTime) historyData.startTime = new Date(historyData.startTime);
            if (historyData.endTime) historyData.endTime = new Date(historyData.endTime);
            
            const history = await this.saveCallHistoryUseCase.execute(historyData);
            res.status(HttpStatus.CREATED).json({ status: ResponseStatus.SUCCESS, data: history });
        } catch (error) {
            next(error);
        }
    }

    async getUserHistory(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const history = await this.getUserCallHistoryUseCase.execute(userId);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: history });
        } catch (error) {
            next(error);
        }
    }
}
