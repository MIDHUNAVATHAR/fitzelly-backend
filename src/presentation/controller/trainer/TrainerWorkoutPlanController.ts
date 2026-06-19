import { NextFunction,  Response } from "express";
import { ICreateOrUpdateWorkoutPlanUseCase } from "../../../application/IUseCases/workout-plan/ICreateOrUpdateWorkoutPlanUseCase";
import { IGetWorkoutPlanByClientIdUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutPlanByClientIdUseCase";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { AuthRequest } from "../../middlewares/protect";
import { ResponseMessage } from "../../../constants/response.constants";



export class TrainerWorkoutPlanController {
    constructor(
        private _createOrUpdateWorkoutPlanUseCase: ICreateOrUpdateWorkoutPlanUseCase,
        private _getWorkoutPlanByClientIdUseCase: IGetWorkoutPlanByClientIdUseCase,
    ) { }

    async createOrUpdatePlan(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {

               if (!req.user) {
                res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.ERROR,
                    message: "Unauthorized"
                });
                return;
            }

            const trainerId = req.user?.id;
            const { clientId, weeklyPlan, notes } = req.body;
            const gymId = req.user?.gymId;
            
            if(!gymId) return ;

            const plan = await this._createOrUpdateWorkoutPlanUseCase.execute({
                clientId,
                trainerId,
                gymId,
                weeklyPlan,
                notes
            });

            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.WORKOUT_PLAN_CREATE_UPDATE_SUCCESS,
                data: plan });
        } catch (error) {
            next(error)
        }
    }

    async getClientPlan(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {

               if (!req.user) {
                res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.ERROR,
                    message: "Unauthorized"
                });
                return;
            }

            const { clientId } = req.params;
            const trainerId = req.user?.id;
            const plan = await this._getWorkoutPlanByClientIdUseCase.execute(clientId as string, trainerId);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message:ResponseMessage.TRAINER_CLIENT_WORKOUT_PLAN_FETCH_SUCCESS,
                data: plan });
        } catch (error) {
            next(error)
        }
    }
}
