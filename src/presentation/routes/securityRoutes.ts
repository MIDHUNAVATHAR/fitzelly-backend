import { Router, Request, Response, NextFunction } from 'express';
import { securityController } from '../../main/controllers.di';
import { protect, AuthRequest } from '../middlewares/protect';
import { ROLES } from '../../constants/roles.constants';
import { SECURITY_ROUTES } from '../../constants/routes.constants';

const securityRouter = Router();

securityRouter.get(SECURITY_ROUTES.ACTIVE_SESSIONS, protect([ROLES.GYM, ROLES.CLIENT, ROLES.TRAINER, ROLES.SUPERADMIN]), (req: Request, res: Response, next: NextFunction) => securityController.getActiveSessions(req as AuthRequest, res, next));
securityRouter.delete(SECURITY_ROUTES.REVOKE_SESSION, protect([ROLES.GYM, ROLES.CLIENT, ROLES.TRAINER, ROLES.SUPERADMIN]), (req: Request, res: Response, next: NextFunction) => securityController.revokeSession(req as AuthRequest, res, next));

export default securityRouter;
