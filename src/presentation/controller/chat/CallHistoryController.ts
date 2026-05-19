import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ISaveCallHistoryUseCase,IGetUserCallHistoryUseCase } from "../../../application/IUseCases/chat/ICallHistoryUseCases";

export class CallHistoryController {
    constructor(
        private _saveCallHistoryUseCase: ISaveCallHistoryUseCase,
        private _getUserCallHistoryUseCase: IGetUserCallHistoryUseCase
    ) { }

    async saveHistory(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const historyData = req.body;
            // Ensure startTime and endTime are Date objects if they come as strings
            if (historyData.startTime) historyData.startTime = new Date(historyData.startTime);
            if (historyData.endTime) historyData.endTime = new Date(historyData.endTime);
            
            const history = await this._saveCallHistoryUseCase.execute(historyData);
            res.status(HttpStatus.CREATED).json({ status: ResponseStatus.SUCCESS, data: history });
        } catch (error) {
            next(error);
        }
    }

    async getUserHistory(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const history = await this._getUserCallHistoryUseCase.execute(userId);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: history });
        } catch (error) {
            next(error);
        }
    }
}
