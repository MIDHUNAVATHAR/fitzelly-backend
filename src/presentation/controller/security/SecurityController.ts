import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/protect';
import { HttpStatus, ResponseStatus } from '../../../constants/statusCodes.constants';
import { GetActiveSessionsUseCase, RevokeSessionUseCase } from '../../../application/usecases/security/SessionUseCases';

export class SecurityController {
    constructor(
        private getActiveSessionsUseCase: GetActiveSessionsUseCase,
        private revokeSessionUseCase: RevokeSessionUseCase
    ) { }

    async getActiveSessions(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const sessions = await this.getActiveSessionsUseCase.execute(req.user!.id);
            const enrichedSessions = sessions.map(session => ({
                ...session,
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
            await this.revokeSessionUseCase.execute(req.params.id as string);
            return res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, message: "Session revoked successfully" });
        } catch (error) {
            next(error);
        }
    }
}
