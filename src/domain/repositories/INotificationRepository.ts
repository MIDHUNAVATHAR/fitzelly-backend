import { Notification } from '../entities/Notification';
export interface INotificationRepository {
    create(notification: Notification): Promise<Notification>;
    getUnreadByTarget(targetId: string, role: string): Promise<Notification[]>;
    getReadByTarget(targetId: string, page: number, limit: number, role: string): Promise<Notification[]>;
    markAsRead(id: string, targetId: string): Promise<void>;
    markAllAsRead(targetId: string): Promise<void>;
}
