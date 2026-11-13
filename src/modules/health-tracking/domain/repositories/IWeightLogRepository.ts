export interface IWeightLog {
    clientId: string;
    weight: number;
    height: number;
    bmi: number;
    date: Date;
}

export interface IWeightLogRepository {
    addLog(log: IWeightLog): Promise<IWeightLog>;
    getLogsByClientId(clientId: string): Promise<IWeightLog[]>;
    getLatestLogByClientId(clientId: string): Promise<IWeightLog | null>;
}
