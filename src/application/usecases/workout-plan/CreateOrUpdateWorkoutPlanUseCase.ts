import { ICreateOrUpdateWorkoutPlanUseCase } from "../../IUseCases/workout-plan/ICreateOrUpdateWorkoutPlanUseCase";
import { WorkoutPlanDTO } from "../../dtos/workout-plan/WorkoutPlanDTO";
import { IWorkoutPlanRepository } from "../../../domain/repositories/IWorkoutPlanRepository";
import { WorkoutPlan } from "../../../domain/entities/WorkoutPlan";

export class CreateOrUpdateWorkoutPlanUseCase implements ICreateOrUpdateWorkoutPlanUseCase {
    constructor(private workoutPlanRepository: IWorkoutPlanRepository) { }

    async execute(data: WorkoutPlanDTO): Promise<WorkoutPlanDTO> {
        const getWeekStart = () => {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday
            const diff = now.getDate() - day;
            const sunday = new Date(now.setDate(diff));
            sunday.setHours(0, 0, 0, 0);
            return sunday;
        };

        const currentWeekSunday = getWeekStart();
        const existingPlan = await this.workoutPlanRepository.findByClientId(data.clientId);

        let shouldCreateNew = true;
        if (existingPlan) {
            const existingWeekStart = new Date(existingPlan.weekStartDate);
            existingWeekStart.setHours(0, 0, 0, 0);

            // If the existing plan's weekStartDate is the same as the current week Sunday, update it.
            if (existingWeekStart.getTime() === currentWeekSunday.getTime()) {
                shouldCreateNew = false;
            }
        }

        if (existingPlan && !shouldCreateNew) {
            const updatedPlan = new WorkoutPlan(
                existingPlan.id,
                data.clientId,
                data.trainerId,
                data.gymId,
                data.weeklyPlan,
                existingPlan.weekStartDate, // Keep the same week start date
                data.notes || ""
            );
            const saved = await this.workoutPlanRepository.update(updatedPlan);
            return this.toDTO(saved);
        } else {
            const newPlan = new WorkoutPlan(
                "",
                data.clientId,
                data.trainerId,
                data.gymId,
                data.weeklyPlan,
                currentWeekSunday,
                data.notes || ""
            );
            const saved = await this.workoutPlanRepository.save(newPlan);
            return this.toDTO(saved);
        }
    }

    private toDTO(plan: WorkoutPlan): WorkoutPlanDTO {
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
