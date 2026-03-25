import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { Notification } from '../../domain/entities/Notification';
import { NotificationModel } from '../database/mongoose/models/NotificationModel';

export class NotificationRepository implements INotificationRepository {
    private toEntity(doc: any): Notification {
        return new Notification(
            doc._id.toString(),
            doc.gymId.toString(),
            doc.message,
            doc.isRead,
            doc.type,
            doc.createdAt
        );
    }
    
    async create(notif: Notification): Promise<Notification> {
        const created = await NotificationModel.create({
            gymId: notif.gymId,
            message: notif.message,
            isRead: notif.isRead,
            type: notif.type
        });
        return this.toEntity(created);
    }
    
    async getUnreadByGymId(gymId: string): Promise<Notification[]> {
        const docs = await NotificationModel.find({ gymId, isRead: false }).sort({ createdAt: -1 });
        return docs.map(d => this.toEntity(d));
    }
    
    async getReadByGymId(gymId: string, page: number, limit: number): Promise<Notification[]> {
        const skip = (page - 1) * limit;
        const docs = await NotificationModel.find({ gymId, isRead: true })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        return docs.map(d => this.toEntity(d));
    }
    
    async markAsRead(id: string, gymId: string): Promise<void> {
        await NotificationModel.findOneAndUpdate({ _id: id, gymId }, { isRead: true });
    }
    
    async markAllAsRead(gymId: string): Promise<void> {
        await NotificationModel.updateMany({ gymId, isRead: false }, { isRead: true });
    }
}
