import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/protect';
import { HttpStatus, ResponseStatus } from '../../../constants/statusCodes.constants';
import { IGetActiveSessionsUseCase, IRevokeSessionUseCase } from '../../../application/IUseCases/security/ISessionUseCases';
import { Session } from '../../../domain/entities/Session';

export class SecurityController {
    constructor(
        private _getActiveSessionsUseCase: IGetActiveSessionsUseCase,
        private _revokeSessionUseCase: IRevokeSessionUseCase
    ) { }

    async getActiveSessions(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const sessions = await this._getActiveSessionsUseCase.execute(req.user!.id);
            const enrichedSessions = sessions.map((session: Session) => ({
                id: session.id,
                userId: session.userId,
                device: session.device,
                browser: session.browser,
                os: session.os,
                ip: session.ip,
                lastActive: session.lastActive,
                createdAt: session.createdAt,
                isRevoked: session.isRevoked,
                isCurrent: session.id === req.user!.sessionId
            }));
            
            // Sort to put current session at the top
            enrichedSessions.sort((a, b) => (a.isCurrent ? -1 : (b.isCurrent ? 1 : 0)));

            return res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: enrichedSessions });
        } catch (error) {
            next(error);
        }
    }

    async revokeSession(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await this._revokeSessionUseCase.execute(req.params.id as string);
            return res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, message: "Session revoked successfully" });
        } catch (error) {
            next(error);
        }
    }
}
