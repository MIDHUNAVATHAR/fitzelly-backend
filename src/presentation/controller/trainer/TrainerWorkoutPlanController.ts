import { NextFunction, Request, Response } from "express";
import { ICreateOrUpdateWorkoutPlanUseCase } from "../../../application/IUseCases/workout-plan/ICreateOrUpdateWorkoutPlanUseCase";
import { IGetWorkoutPlanByClientIdUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutPlanByClientIdUseCase";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";

interface CustomRequest extends Request {
    user: {
        id: string;
        gymId?: string;
        role: string;
        email: string;
    };
}

export class TrainerWorkoutPlanController {
    constructor(
        private _createOrUpdateWorkoutPlanUseCase: ICreateOrUpdateWorkoutPlanUseCase,
        private _getWorkoutPlanByClientIdUseCase: IGetWorkoutPlanByClientIdUseCase,
    ) { }

    async createOrUpdatePlan(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authReq = req as unknown as CustomRequest;
            const trainerId = authReq.user.id;
            const { clientId, weeklyPlan, notes } = req.body;
            const gymId = authReq.user.gymId!;          

            const plan = await this._createOrUpdateWorkoutPlanUseCase.execute({
                clientId,
                trainerId,
                gymId,
                weeklyPlan,
                notes
            });

            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: plan });
        } catch (error) {
            next(error)
        }
    }

    async getClientPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authReq = req as unknown as CustomRequest;
            const { clientId } = req.params;
            const trainerId = authReq.user.id;
            const plan = await this._getWorkoutPlanByClientIdUseCase.execute(clientId as string, trainerId);
            res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: plan });
        } catch (error) {
            next(error)
        }
    }
}
