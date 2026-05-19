import { ICallHistoryDocument } from "../../../infrastructure/database/mongoose/types/ICallHistoryDocument";
import { ICallHistoryWithUser } from "../../../domain/repositories/ICallHistoryRepository";

export interface ISaveCallHistoryUseCase {
    execute(data: Partial<ICallHistoryDocument>): Promise<ICallHistoryDocument>;
}

export interface IGetUserCallHistoryUseCase {
    execute(userId: string): Promise<ICallHistoryWithUser[]>;
}
