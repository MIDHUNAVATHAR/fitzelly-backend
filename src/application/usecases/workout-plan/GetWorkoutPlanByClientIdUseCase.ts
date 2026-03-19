import { IGetWorkoutPlanByClientIdUseCase } from "../../IUseCases/workout-plan/IGetWorkoutPlanByClientIdUseCase";
import { WorkoutPlanDTO } from "../../dtos/workout-plan/WorkoutPlanDTO";
import { IWorkoutPlanRepository } from "../../../domain/repositories/IWorkoutPlanRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { WorkoutPlan } from "../../../domain/entities/WorkoutPlan";

export class GetWorkoutPlanByClientIdUseCase implements IGetWorkoutPlanByClientIdUseCase {
    constructor(
        private workoutPlanRepository: IWorkoutPlanRepository,
        private trainerRepository: ITrainerRepository
    ) { }

    async execute(clientId: string, trainerId?: string): Promise<WorkoutPlanDTO | null> {
        const getWeekStart = () => {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday
            const diff = now.getDate() - day;
            const sunday = new Date(now.setDate(diff));
            sunday.setHours(0, 0, 0, 0);
            return sunday;
        };

        const currentWeekSunday = getWeekStart();

        /**
         * find existing plan for this week
         */
        let plan = await this.workoutPlanRepository.findByClientIdAndWeekStart(clientId, currentWeekSunday);

        /**
         * if not found, create a new empty template
         */
        if (!plan && trainerId) {
            const trainer = await this.trainerRepository.findById(trainerId);
            if (!trainer) throw new Error("Trainer not found");

            const newPlan = new WorkoutPlan(
                "",
                clientId,
                trainerId,
                trainer.gymId,
                [], // empty weekly plan
                currentWeekSunday,
                ""
            );
            plan = await this.workoutPlanRepository.save(newPlan);
        }

        if (!plan) return null;

        return {
            id: plan.id,
            clientId: plan.clientId,
            trainerId: plan.trainerId,
            gymId: plan.gymId,
            weeklyPlan: plan.weeklyPlan,
            weekStartDate: plan.weekStartDate,
            notes: plan.notes
        };
    }
}
