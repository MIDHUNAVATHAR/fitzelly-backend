import { INotificationRepository } from '../../../domain/repositories/INotificationRepository';
import { ISocketService } from '../../../domain/services/ISocketService';
import { Notification } from '../../../domain/entities/Notification';

export class AddNotificationUseCase {
    constructor(private notificationRepo: INotificationRepository, private socketService: ISocketService) {}
    
    async execute(gymId: string, message: string, type: string, targetRole: string = 'gym'): Promise<Notification> {
        const notif = new Notification('', gymId, message, false, type, new Date(), targetRole);
        const saved = await this.notificationRepo.create(notif);
        if (targetRole === 'gym') {
            this.socketService.emitToGym(gymId, 'NEW_NOTIFICATION', saved);
        } else {
            this.socketService.emitToRole(targetRole, 'NEW_NOTIFICATION', saved);
        }
        return saved;
    }
}

export class GetNotificationsUseCase {
    constructor(private notificationRepo: INotificationRepository) {}
    
    async getUnread(targetId: string, role: string = 'GYM') { 
        return await this.notificationRepo.getUnreadByTarget(targetId, role); 
    }
    
    async getRead(targetId: string, page: number, limit: number, role: string = 'GYM') { 
        return await this.notificationRepo.getReadByTarget(targetId, page, limit, role); 
    }
}

export class MarkNotificationUseCase {
    constructor(private notificationRepo: INotificationRepository) {}
    
    async markAsRead(id: string, gymId: string) { 
        await this.notificationRepo.markAsRead(id, gymId); 
    }
    
    async markAllAsRead(gymId: string) { 
        await this.notificationRepo.markAllAsRead(gymId); 
    }
}
