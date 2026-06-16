import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/protect';
import { HttpStatus, ResponseStatus } from '../../../constants/statusCodes.constants';
import { IGetNotificationsUseCase, IMarkNotificationUseCase } from '../../../application/IUseCases/notification/INotificationUseCases';
import { ResponseMessage } from '../../../constants/response.constants';


export class NotificationController {
    constructor(
        private _getNotifUseCase: IGetNotificationsUseCase,
        private _markNotifUseCase: IMarkNotificationUseCase
    ) { }

    /*
    * get unread notifications
    */
    async getUnread(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await this._getNotifUseCase.getUnread(req.user!.id, req.user!.role);
            return res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message:ResponseMessage.NOTIFICATIONS_UNREAD_FETCH_SUCCESS,
                data: result });
        } catch (error) {
            next(error);
        }
    }

    /*
    * get readed notifications
    */
    async getRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const result = await this._getNotifUseCase.getRead(req.user!.id, page, 10, req.user!.role);
            return res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message:ResponseMessage.NOTIFICATIONS_READ_FETCH_SUCCESS,
                data: result });
        } catch (error) {
            next(error);
        }
    }


    /*
    * update notification as readed
    */
    async markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await this._markNotifUseCase.markAsRead(req.params.id as string, req.user!.id);
            return res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.NOTIFICATION_MARKED_READ_SUCCESS });
        } catch (error) {
            next(error);
        }
    }

    /*
    * update all notifications as readed
    */
    async markAllAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await this._markNotifUseCase.markAllAsRead(req.user!.id);
            return res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.NOTIFICATION_MARK_ALL_READ_SUCCESS });
        } catch (error) {
            next(error);
        }
    }
}