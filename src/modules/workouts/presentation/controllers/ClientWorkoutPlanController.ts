import { NextFunction, Response } from "express";
import { IGetWorkoutPlanByClientIdUseCase } from "../../application/interfaces/IGetWorkoutPlanByClientIdUseCase";
import { ITrackWorkoutProgressUseCase } from "../../application/interfaces/ITrackWorkoutProgressUseCase";
import { IGetWorkoutProgressUseCase } from "../../application/interfaces/IGetWorkoutProgressUseCase";
import { IGetWorkoutStreakUseCase } from "../../application/interfaces/IGetWorkoutStreakUseCase";
import { AuthRequest } from "../../../../shared/middleware/protect";
import { HttpStatus } from "../../../../shared/constants/statusCodes.constants";
import { ResponseStatus } from "../../../../shared/constants/statusCodes.constants";
import { ResponseMessage } from "../../../../shared/constants/response.constants";


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
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message:ResponseMessage.WORKOUT_PLAN_FETCH_SUCCESS,
                data: plan });
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

            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.WORKOUT_PROGRESS_TRACK_SUCCESS,
                data: progress });
        } catch (error) {
            next(error)
        }
    }

    async getProgress(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const { date } = req.query; // e.g. ?date=2024-03-20

            const progress = await this._getWorkoutProgressUseCase.execute(clientId, date as string);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.WORKOUT_PROGRESS_FETCH_SUCCESS,
                data: progress });
        } catch (error) {
            next(error)
        }
    }

    async getStreak(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const streak = await this._getWorkoutStreakUseCase.execute(clientId);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.WORKOUT_STREAK_FETCH_SUCCESS,
                data: streak });
        } catch (error) {
            next(error)
        }
    }
}
