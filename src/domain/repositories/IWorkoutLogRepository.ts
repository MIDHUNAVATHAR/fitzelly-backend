export interface IWorkoutLog {
    clientId: string;
    date: Date;
    completedExercises: string[];
}

export interface IWorkoutLogRepository {
    findByClientIdAndDate(clientId: string, date: Date): Promise<IWorkoutLog | null>;
    findByClientId(clientId: string): Promise<IWorkoutLog[]>;
    save(log: IWorkoutLog): Promise<IWorkoutLog>
}