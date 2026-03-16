import { Request, Response } from "express";
import { ICreateOrUpdateWorkoutPlanUseCase } from "../../../application/IUseCases/workout-plan/ICreateOrUpdateWorkoutPlanUseCase";
import { IGetWorkoutPlanByClientIdUseCase } from "../../../application/IUseCases/workout-plan/IGetWorkoutPlanByClientIdUseCase";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";

export class TrainerWorkoutPlanController {
    constructor(
        private createOrUpdateWorkoutPlanUseCase: ICreateOrUpdateWorkoutPlanUseCase,
        private getWorkoutPlanByClientIdUseCase: IGetWorkoutPlanByClientIdUseCase,
        private trainerRepository: ITrainerRepository
    ) { }

    async createOrUpdatePlan(req: Request, res: Response): Promise<void> {
        try {
            const trainerId = (req as any).user.id;
            const { clientId, weeklyPlan, notes } = req.body;
            let gymId = (req as any).user.gymId;

            if (!gymId) {
                const trainer = await this.trainerRepository.findById(trainerId);
                if (!trainer) throw new Error("Trainer not found");
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
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async getClientPlan(req: Request, res: Response): Promise<void> {
        try {
            const { clientId } = req.params;
            const trainerId = (req as any).user.id;
            const plan = await this.getWorkoutPlanByClientIdUseCase.execute(clientId as string, trainerId);
            res.status(200).json({ status: "success", data: plan });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
}
