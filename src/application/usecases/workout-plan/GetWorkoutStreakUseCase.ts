import { IGetWorkoutStreakUseCase } from "../../IUseCases/workout-plan/IGetWorkoutStreakUseCase";
import { IWorkoutLogRepository } from "../../../domain/repositories/IWorkoutLogRepository";

export class GetWorkoutStreakUseCase implements IGetWorkoutStreakUseCase {
    constructor(private workoutLogRepository: IWorkoutLogRepository) { }

    async execute(clientId: string): Promise<number> {
        const logs = await this.workoutLogRepository.findByClientId(clientId);
        if (logs.length === 0) return 0;

        const validLogs = logs.filter(log => log.completedExercises.length > 0);
        if (validLogs.length === 0) return 0;

        validLogs.sort((a, b) => b.date.getTime() - a.date.getTime());

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const lastWorkoutDate = new Date(validLogs[0].date);
        lastWorkoutDate.setHours(0, 0, 0, 0);

        /**
         * If the last workout was before yesterday, streak is zero
         */
        if (lastWorkoutDate.getTime() < yesterday.getTime()) {
            return 0;
        }

        let streak = 1;
        let currentCheckDate = new Date(lastWorkoutDate);

        for (let i = 1; i < validLogs.length; i++) {
            const prevWorkoutDate = new Date(validLogs[i].date);
            prevWorkoutDate.setHours(0, 0, 0, 0);

            const expectedDate = new Date(currentCheckDate);
            expectedDate.setDate(expectedDate.getDate() - 1);

            if (prevWorkoutDate.getTime() === expectedDate.getTime()) {
                streak++;
                currentCheckDate = prevWorkoutDate;
            } else {
                break; // Streak broken
            }
        }

        return streak;
    }
}
