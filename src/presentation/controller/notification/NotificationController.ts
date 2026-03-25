import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/protect';
import { HttpStatus, ResponseStatus } from '../../../constants/statusCodes.constants';
import { GetNotificationsUseCase, MarkNotificationUseCase } from '../../../application/usecases/notification/NotificationUseCases';

export class NotificationController {
    constructor(
        private getNotifUseCase: GetNotificationsUseCase,
        private markNotifUseCase: MarkNotificationUseCase
    ) {}

    async getUnread(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await this.getNotifUseCase.getUnread(req.user!.id);
            return res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: result });
        } catch (e) { next(e); }
    }
    
    async getRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const result = await this.getNotifUseCase.getRead(req.user!.id, page, 10);
            return res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, data: result });
        } catch (e) { next(e); }
    }
    
    async markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await this.markNotifUseCase.markAsRead(req.params.id as string, req.user!.id);
            return res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, message: 'Marked as read' });
        } catch (e) { next(e); }
    }
    
    async markAllAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await this.markNotifUseCase.markAllAsRead(req.user!.id);
            return res.status(HttpStatus.OK).json({ status: ResponseStatus.SUCCESS, message: 'All marked as read' });
        } catch (e) { next(e); }
    }
}
