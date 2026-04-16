import { ISessionRepository } from '../../domain/repositories/ISessionRepository';
import { Session } from '../../domain/entities/Session';
import { SessionModel } from '../database/mongoose/models/SessionModel';
import { redisConnection } from '../database/RedisConnection';
import { Types } from 'mongoose';

const REDIS_SESSION_PREFIX = 'session:';


export class SessionRepository implements ISessionRepository {
    private toEntity(doc: { _id: Types.ObjectId; userId: Types.ObjectId; role: string; device: string; browser: string; os: string; ip: string; lastActive: Date; expiredAt: Date; createdAt: Date; isRevoked: boolean; gymId?: Types.ObjectId | null }): Session {
        return new Session(
            doc._id.toString(),
            doc.userId.toString(),
            doc.role,
            doc.device,
            doc.browser,
            doc.os,
            doc.ip,
            doc.lastActive,
            doc.expiredAt,
            doc.createdAt,
            doc.isRevoked,
            doc.gymId?.toString()
        );
    }

    async create(session: Session): Promise<Session> {
        const created = await SessionModel.create({
            userId: session.userId,
            gymId: session.gymId,
            role: session.role,
            device: session.device,
            browser: session.browser,
            os: session.os,
            ip: session.ip,
            lastActive: session.lastActive,
            expiredAt: session.expiredAt,
            isRevoked: session.isRevoked
        });

        // Store in Redis with TTL until expiry
        const now = new Date();
        const ttlInSeconds = Math.max(0, Math.floor((session.expiredAt.getTime() - now.getTime()) / 1000));

        await redisConnection.set(
            `${REDIS_SESSION_PREFIX}${created._id.toString()}`,
            'active',
            'EX',
            ttlInSeconds
        );

        return this.toEntity(created);
    }

    async findById(id: string): Promise<Session | null> {
        const doc = await SessionModel.findById(id);
        return doc ? this.toEntity(doc) : null;
    }

    async findByUserId(userId: string): Promise<Session[]> {
        const docs = await SessionModel.find({ userId, isRevoked: false }).sort({ lastActive: -1 });
        return docs.map(d => this.toEntity(d));
    }

    async revoke(id: string): Promise<void> {
        await SessionModel.findByIdAndUpdate(id, { isRevoked: true });
        await redisConnection.del(`${REDIS_SESSION_PREFIX}${id}`);
    }

    async revokeAllForUser(userId: string): Promise<void> {
        const activeSessions = await SessionModel.find({ userId, isRevoked: false });
        const ids = activeSessions.map(s => s._id.toString());
        
        await SessionModel.updateMany({ userId }, { isRevoked: true });
        
        if (ids.length > 0) {
            const redisKeys = ids.map(id => `${REDIS_SESSION_PREFIX}${id}`);
            await redisConnection.del(...redisKeys);
        }
    }

    async updateLastActive(id: string): Promise<void> {
        await SessionModel.findByIdAndUpdate(id, { lastActive: new Date() });
    }

    async isSessionActive(id: string): Promise<boolean> {
        // Check Redis first
        const exists = await redisConnection.exists(`${REDIS_SESSION_PREFIX}${id}`);
        if (exists) return true;

        // Fallback to DB (might be needed if Redis was cleared)
        const session = await SessionModel.findById(id);
        if (session && !session.isRevoked && session.expiredAt > new Date()) {
            // Restore in Redis with remaining TTL
            const ttlInSeconds = Math.max(0, Math.floor((session.expiredAt.getTime() - Date.now()) / 1000));
            if (ttlInSeconds > 0) {
                await redisConnection.set(
                    `${REDIS_SESSION_PREFIX}${id}`,
                    'active',
                    'EX',
                    ttlInSeconds
                );
            }
            return true;
        }

        return false;
    }
}
