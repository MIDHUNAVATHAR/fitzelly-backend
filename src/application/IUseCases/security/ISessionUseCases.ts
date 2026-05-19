import { Session } from "../../../domain/entities/Session";

export interface IGetActiveSessionsUseCase {
    execute(userId: string): Promise<Session[]>;
}

export interface IRevokeSessionUseCase {
    execute(sessionId: string): Promise<void>;
}
