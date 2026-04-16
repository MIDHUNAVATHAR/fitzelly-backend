import { Session } from '../entities/Session';

export interface ISessionRepository {
    create(session: Session): Promise<Session>;
    findById(id: string): Promise<Session | null>;
    findByUserId(userId: string): Promise<Session[]>;
    revoke(id: string): Promise<void>;
    revokeAllForUser(userId: string): Promise<void>;
    updateLastActive(id: string): Promise<void>;
    isSessionActive(id: string): Promise<boolean>;
}
