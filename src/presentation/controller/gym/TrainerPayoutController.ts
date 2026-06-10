import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { 
    IAddTrainerPayoutUseCase, 
    IGetTrainerPayoutsUseCase, 
    IUpdateTrainerPayoutUseCase, 
    IDeleteTrainerPayoutUseCase,
    IGetTrainerEarningsUseCase
} from "../../../application/IUseCases/trainer-payout/ITrainerPayoutUseCases";
import { ResponseMessage } from "../../../constants/response.constants";


export class TrainerPayoutController {
    constructor(
        private _addPayoutUseCase: IAddTrainerPayoutUseCase,
        private _getPayoutsUseCase: IGetTrainerPayoutsUseCase,
        private _updatePayoutUseCase: IUpdateTrainerPayoutUseCase,
        private _deletePayoutUseCase: IDeleteTrainerPayoutUseCase,
        private _getEarningsUseCase: IGetTrainerEarningsUseCase
    ) { }

    async addPayout(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const result = await this._addPayoutUseCase.execute(gymId, req.body);
            return res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_PAYOUT_ADD_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getPayouts(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const { page = 1, limit = 10, trainerId, startDate, endDate } = req.query;

            const result = await this._getPayoutsUseCase.execute(
                gymId,
                Number(page),
                Number(limit),
                trainerId as string,
                startDate ? new Date(startDate as string) : undefined,
                endDate ? new Date(endDate as string) : undefined
            );

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_PAYOUTS_FETCH_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async updatePayout(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const result = await this._updatePayoutUseCase.execute(id, req.body);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_PAYOUT_UPDATE_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async deletePayout(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await this._deletePayoutUseCase.execute(id);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_PAYOUT_DELETE_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }

    async getEarningsForTrainer(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const trainerId = req.user!.id;
            const { page = 1, limit = 10 } = req.query;

            const result = await this._getEarningsUseCase.execute(
                trainerId,
                Number(page),
                Number(limit)
            );

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_EARNINGS_FETCH_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}
