import { Request, Response } from "express";
import { IGetWorkoutPlanByClientIdUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutPlanByClientIdUseCase";
import { ITrackWorkoutProgressUseCase } from "../../../application/IUseCases/workout-plan/ITrackWorkoutProgressUseCase";
import { IGetWorkoutProgressUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutProgressUseCase";
import { IGetWorkoutStreakUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutStreakUseCase";

export class ClientWorkoutPlanController {
    constructor(
        private getWorkoutPlanByClientIdUseCase: IGetWorkoutPlanByClientIdUseCase,
        private trackWorkoutProgressUseCase: ITrackWorkoutProgressUseCase,
        private getWorkoutProgressUseCase: IGetWorkoutProgressUseCase,
        private getWorkoutStreakUseCase: IGetWorkoutStreakUseCase
    ) { }

    async getMyPlan(req: Request, res: Response): Promise<void> {
        try {
            const clientId = (req as any).user.id;
            const plan = await this.getWorkoutPlanByClientIdUseCase.execute(clientId);
            res.status(200).json({ status: "success", data: plan });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async trackProgress(req: Request, res: Response): Promise<void> {
        try {
            const clientId = (req as any).user.id;
            const { date, completedExercises } = req.body;

            const progress = await this.trackWorkoutProgressUseCase.execute(clientId, {
                date,
                completedExercises
            });

            res.status(200).json({ status: "success", data: progress });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async getProgress(req: Request, res: Response): Promise<void> {
        try {
            const clientId = (req as any).user.id;
            const { date } = req.query; // e.g. ?date=2024-03-20

            const progress = await this.getWorkoutProgressUseCase.execute(clientId, date as string);
            res.status(200).json({ status: "success", data: progress });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async getStreak(req: Request, res: Response): Promise<void> {
        try {
            const clientId = (req as any).user.id;
            const streak = await this.getWorkoutStreakUseCase.execute(clientId);
            res.status(200).json({ status: "success", data: streak });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
}
