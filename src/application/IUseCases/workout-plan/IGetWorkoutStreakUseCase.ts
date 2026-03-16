export interface IGetWorkoutStreakUseCase {
    execute(clientId: string): Promise<number>;
}
