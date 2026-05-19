import { INotificationRepository } from '../../../domain/repositories/INotificationRepository';
import { ISocketService } from '../../../domain/services/ISocketService';
import { Notification } from '../../../domain/entities/Notification';
import { IAddNotificationUseCase, IGetNotificationsUseCase, IMarkNotificationUseCase } from '../../IUseCases/notification/INotificationUseCases';

export class AddNotificationUseCase implements IAddNotificationUseCase {
    constructor(private _notificationRepo: INotificationRepository, private socketService: ISocketService) {}
    
    async execute(gymId: string, message: string, type: string, targetRole: string = 'gym'): Promise<Notification> {
        const notif = new Notification('', gymId, message, false, type, new Date(), targetRole);
        const saved = await this._notificationRepo.create(notif);
        if (targetRole === 'gym') {
            this.socketService.emitToGym(gymId, 'NEW_NOTIFICATION', saved);
        } else {
            this.socketService.emitToRole(targetRole, 'NEW_NOTIFICATION', saved);
        }
        return saved;
    }
}

export class GetNotificationsUseCase implements IGetNotificationsUseCase {
    constructor(private _notificationRepo: INotificationRepository) {}
    
    async getUnread(targetId: string, role: string = 'GYM'): Promise<Notification[]> { 
        return await this._notificationRepo.getUnreadByTarget(targetId, role); 
    }
    
    async getRead(targetId: string, page: number, limit: number, role: string = 'GYM'): Promise<Notification[]> { 
        return await this._notificationRepo.getReadByTarget(targetId, page, limit, role); 
    }
}

export class MarkNotificationUseCase implements IMarkNotificationUseCase {
    constructor(private _notificationRepo: INotificationRepository) {}
    
    async markAsRead(id: string, gymId: string): Promise<void> { 
        await this._notificationRepo.markAsRead(id, gymId); 
    }
    
    async markAllAsRead(gymId: string): Promise<void> { 
        await this._notificationRepo.markAllAsRead(gymId); 
    }
}