import { INotificationRepository } from '../../../domain/repositories/INotificationRepository';
import { ISocketService } from '../../../domain/services/ISocketService';
import { Notification } from '../../../domain/entities/Notification';

export class AddNotificationUseCase {
    constructor(private notificationRepo: INotificationRepository, private socketService: ISocketService) {}
    
    async execute(gymId: string, message: string, type: string): Promise<Notification> {
        const notif = new Notification('', gymId, message, false, type, new Date());
        const saved = await this.notificationRepo.create(notif);
        this.socketService.emitToGym(gymId, 'NEW_NOTIFICATION', saved);
        return saved;
    }
}

export class GetNotificationsUseCase {
    constructor(private notificationRepo: INotificationRepository) {}
    
    async getUnread(gymId: string) { 
        return await this.notificationRepo.getUnreadByGymId(gymId); 
    }
    
    async getRead(gymId: string, page: number, limit: number) { 
        return await this.notificationRepo.getReadByGymId(gymId, page, limit); 
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
