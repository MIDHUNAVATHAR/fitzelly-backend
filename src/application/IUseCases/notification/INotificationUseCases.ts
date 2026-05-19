import { Notification } from "../../../domain/entities/Notification";

export interface IAddNotificationUseCase {
    execute(gymId: string, message: string, type: string, targetRole?: string): Promise<Notification>;
}

export interface IGetNotificationsUseCase {
    getUnread(targetId: string, role?: string): Promise<Notification[]>;
    getRead(targetId: string, page: number, limit: number, role?: string): Promise<Notification[]>;
}

export interface IMarkNotificationUseCase {
    markAsRead(id: string, gymId: string): Promise<void>;
    markAllAsRead(gymId: string): Promise<void>;
}
