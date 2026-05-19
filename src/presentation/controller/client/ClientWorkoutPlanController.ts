import { NextFunction, Response } from "express";
import { IGetWorkoutPlanByClientIdUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutPlanByClientIdUseCase";
import { ITrackWorkoutProgressUseCase } from "../../../application/IUseCases/workout-plan/ITrackWorkoutProgressUseCase";
import { IGetWorkoutProgressUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutProgressUseCase";
import { IGetWorkoutStreakUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutStreakUseCase";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus } from "../../../constants/statusCodes.constants";

export class ClientWorkoutPlanController {
    constructor(
        private _getWorkoutPlanByClientIdUseCase: IGetWorkoutPlanByClientIdUseCase,
        private _trackWorkoutProgressUseCase: ITrackWorkoutProgressUseCase,
        private _getWorkoutProgressUseCase: IGetWorkoutProgressUseCase,
        private _getWorkoutStreakUseCase: IGetWorkoutStreakUseCase
    ) { }

   
    async getMyPlan(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const plan = await this._getWorkoutPlanByClientIdUseCase.execute(clientId);
            res.status(HttpStatus.OK).json({ status: "success", data: plan });
        } catch (error) {
            next(error)
        }
    }

    async trackProgress(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const { date, completedExercises } = req.body;

            const progress = await this._trackWorkoutProgressUseCase.execute(clientId, {
                date,
                completedExercises
            });

            res.status(HttpStatus.OK).json({ status: "success", data: progress });
        } catch (error) {
            next(error)
        }
    }

    async getProgress(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const { date } = req.query; // e.g. ?date=2024-03-20

            const progress = await this._getWorkoutProgressUseCase.execute(clientId, date as string);
            res.status(HttpStatus.OK).json({ status: "success", data: progress });
        } catch (error) {
            next(error)
        }
    }

    async getStreak(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const streak = await this._getWorkoutStreakUseCase.execute(clientId);
            res.status(HttpStatus.OK).json({ status: "success", data: streak });
        } catch (error) {
            next(error)
        }
    }
}
