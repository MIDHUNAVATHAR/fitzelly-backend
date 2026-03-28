import { NextFunction, Response } from "express";
import { IGetWorkoutPlanByClientIdUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutPlanByClientIdUseCase";
import { ITrackWorkoutProgressUseCase } from "../../../application/IUseCases/workout-plan/ITrackWorkoutProgressUseCase";
import { IGetWorkoutProgressUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutProgressUseCase";
import { IGetWorkoutStreakUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutStreakUseCase";
import { AuthRequest } from "../../middlewares/protect";

export class ClientWorkoutPlanController {
    constructor(
        private getWorkoutPlanByClientIdUseCase: IGetWorkoutPlanByClientIdUseCase,
        private trackWorkoutProgressUseCase: ITrackWorkoutProgressUseCase,
        private getWorkoutProgressUseCase: IGetWorkoutProgressUseCase,
        private getWorkoutStreakUseCase: IGetWorkoutStreakUseCase
    ) { }

   
    async getMyPlan(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const plan = await this.getWorkoutPlanByClientIdUseCase.execute(clientId);
            res.status(200).json({ status: "success", data: plan });
        } catch (error) {
            next(error)
        }
    }

    async trackProgress(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const { date, completedExercises } = req.body;

            const progress = await this.trackWorkoutProgressUseCase.execute(clientId, {
                date,
                completedExercises
            });

            res.status(200).json({ status: "success", data: progress });
        } catch (error) {
            next(error)
        }
    }

    async getProgress(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const { date } = req.query; // e.g. ?date=2024-03-20

            const progress = await this.getWorkoutProgressUseCase.execute(clientId, date as string);
            res.status(200).json({ status: "success", data: progress });
        } catch (error) {
            next(error)
        }
    }

    async getStreak(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientId = req.user!.id;
            const streak = await this.getWorkoutStreakUseCase.execute(clientId);
            res.status(200).json({ status: "success", data: streak });
        } catch (error) {
            next(error)
        }
    }
}
