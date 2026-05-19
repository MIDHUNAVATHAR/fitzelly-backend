import { IWeightLog } from "../../../domain/repositories/IWeightLogRepository";

export interface IAddWeightLogUseCase {
    execute(log: IWeightLog): Promise<IWeightLog>;
}

export interface IGetWeightLogsUseCase {
    execute(clientId: string): Promise<IWeightLog[]>;
}
