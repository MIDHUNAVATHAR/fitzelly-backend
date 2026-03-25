import { Notification } from '../entities/Notification';
export interface INotificationRepository {
    create(notification: Notification): Promise<Notification>;
    getUnreadByGymId(gymId: string): Promise<Notification[]>;
    getReadByGymId(gymId: string, page: number, limit: number): Promise<Notification[]>;
    markAsRead(id: string, gymId: string): Promise<void>;
    markAllAsRead(gymId: string): Promise<void>;
}
