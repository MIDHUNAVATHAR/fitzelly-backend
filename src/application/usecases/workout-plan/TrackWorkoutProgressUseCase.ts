import { ITrackWorkoutProgressUseCase } from "../../IUseCases/workout-plan/ITrackWorkoutProgressUseCase";
import { WorkoutProgressDTO } from "../../dtos/workout-plan/WorkoutPlanDTO";
import { IWorkoutLogRepository, IWorkoutLog } from "../../../domain/repositories/IWorkoutLogRepository";

export class TrackWorkoutProgressUseCase implements ITrackWorkoutProgressUseCase {
    constructor(private _workoutLogRepository: IWorkoutLogRepository) { }

    async execute(clientId: string, data: WorkoutProgressDTO): Promise<WorkoutProgressDTO> {
        const date = new Date(data.date);
        const existing = await this._workoutLogRepository.findByClientIdAndDate(clientId, date);

        const log: IWorkoutLog = {
            clientId,
            date,
            completedExercises: data.completedExercises
        };

        let saved: IWorkoutLog;
        if (existing) {
            saved = await this._workoutLogRepository.update(log);
        } else {
            saved = await this._workoutLogRepository.save(log);
        }

        return {
            date: saved.date.toISOString(),
            completedExercises: saved.completedExercises
        };
    }
}
