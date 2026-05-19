import { ISessionRepository } from "../../../domain/repositories/ISessionRepository";
import { Session } from "../../../domain/entities/Session";
import { IGetActiveSessionsUseCase, IRevokeSessionUseCase } from "../../IUseCases/security/ISessionUseCases";

export class GetActiveSessionsUseCase implements IGetActiveSessionsUseCase {
    constructor(private _sessionRepo: ISessionRepository) {}

    async execute(userId: string): Promise<Session[]> {
        return await this._sessionRepo.findByUserId(userId);
    }
}

export class RevokeSessionUseCase implements IRevokeSessionUseCase {
    constructor(private _sessionRepo: ISessionRepository) {}

    async execute(sessionId: string): Promise<void> {
        await this._sessionRepo.revoke(sessionId);
    }
}

