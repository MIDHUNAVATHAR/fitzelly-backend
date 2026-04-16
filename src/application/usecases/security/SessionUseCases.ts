import { ISessionRepository } from "../../../domain/repositories/ISessionRepository";
import { Session } from "../../../domain/entities/Session";

export class GetActiveSessionsUseCase {
    constructor(private sessionRepo: ISessionRepository) {}

    async execute(userId: string): Promise<Session[]> {
        return await this.sessionRepo.findByUserId(userId);
    }
}

export class RevokeSessionUseCase {
    constructor(private sessionRepo: ISessionRepository) {}

    async execute(sessionId: string): Promise<void> {
        await this.sessionRepo.revoke(sessionId);
    }
}
