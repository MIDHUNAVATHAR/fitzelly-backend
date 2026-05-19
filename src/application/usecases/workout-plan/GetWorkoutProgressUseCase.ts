import { IGetWorkoutProgressUseCase } from "../../IUseCases/workout-plan/IGetWorkoutProgressUseCase";
import { WorkoutProgressDTO } from "../../dtos/workout-plan/WorkoutPlanDTO";
import { IWorkoutLogRepository } from "../../../domain/repositories/IWorkoutLogRepository";

export class GetWorkoutProgressUseCase implements IGetWorkoutProgressUseCase {
    constructor(private _workoutLogRepository: IWorkoutLogRepository) { }

    async execute(clientId: string, dateStr: string): Promise<WorkoutProgressDTO | null> {
        const date = new Date(dateStr);
        const log = await this._workoutLogRepository.findByClientIdAndDate(clientId, date);
        if (!log) return null;

        return {
            date: log.date.toISOString(),
            completedExercises: log.completedExercises
        };
    }
}
