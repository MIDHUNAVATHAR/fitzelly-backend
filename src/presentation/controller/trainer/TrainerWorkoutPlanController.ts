import { NextFunction, Request, Response } from "express";
import { ICreateOrUpdateWorkoutPlanUseCase } from "../../../application/IUseCases/workout-plan/ICreateOrUpdateWorkoutPlanUseCase";
import { IGetWorkoutPlanByClientIdUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutPlanByClientIdUseCase";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { NotFoundError } from "../../../application/errors/AppError";

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
        private createOrUpdateWorkoutPlanUseCase: ICreateOrUpdateWorkoutPlanUseCase,
        private getWorkoutPlanByClientIdUseCase: IGetWorkoutPlanByClientIdUseCase,
        private trainerRepository: ITrainerRepository
    ) { }

    async createOrUpdatePlan(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authReq = req as unknown as CustomRequest;
            const trainerId = authReq.user.id;
            const { clientId, weeklyPlan, notes } = req.body;
            let gymId = authReq.user.gymId;

            if (!gymId) {
                const trainer = await this.trainerRepository.findById(trainerId);
                if (!trainer) throw new NotFoundError("Trainer not found");
                gymId = trainer.gymId;
            }

            const plan = await this.createOrUpdateWorkoutPlanUseCase.execute({
                clientId,
                trainerId,
                gymId,
                weeklyPlan,
                notes
            });

            res.status(200).json({ status: "success", data: plan });
        } catch (error) {
            next(error)
        }
    }

    async getClientPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authReq = req as unknown as CustomRequest;
            const { clientId } = req.params;
            const trainerId = authReq.user.id;
            const plan = await this.getWorkoutPlanByClientIdUseCase.execute(clientId as string, trainerId);
            res.status(200).json({ status: "success", data: plan });
        } catch (error) {
            next(error)
        }
    }
}
