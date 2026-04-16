import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { Notification } from '../../domain/entities/Notification';
import { NotificationModel } from '../database/mongoose/models/NotificationModel';
import { Types } from 'mongoose';

export class NotificationRepository implements INotificationRepository {
    private toEntity(doc: { _id: Types.ObjectId; gymId: Types.ObjectId; message: string; isRead: boolean; type: string; createdAt: Date; targetRole?: string }): Notification {
        return new Notification(
            doc._id.toString(),
            doc.gymId.toString(),
            doc.message,
            doc.isRead,
            doc.type,
            doc.createdAt,
            doc.targetRole || 'GYM'
        );
    }
    
    async create(notif: Notification): Promise<Notification> {
        const created = await NotificationModel.create({
            gymId: notif.gymId,
            message: notif.message,
            isRead: notif.isRead,
            type: notif.type,
            targetRole: notif.targetRole
        });
        return this.toEntity(created);
    }
    
    async getUnreadByTarget(targetId: string, role: string): Promise<Notification[]> {
        const query = role === 'gym' 
            ? { gymId: targetId, targetRole: 'gym', isRead: false }
            : { targetRole: role, isRead: false };
        const docs = await NotificationModel.find(query).sort({ createdAt: -1 });
        return docs.map(d => this.toEntity(d));
    }
    
    async getReadByTarget(targetId: string, page: number, limit: number, role: string): Promise<Notification[]> {
        const skip = (page - 1) * limit;
        const query = role === 'gym' 
            ? { gymId: targetId, targetRole: 'gym', isRead: true }
            : { targetRole: role, isRead: true };
        const docs = await NotificationModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        return docs.map(d => this.toEntity(d));
    }
    
    async markAsRead(id: string, _targetId: string): Promise<void> {
      
        await NotificationModel.findByIdAndUpdate(id, { isRead: true });
    }
    
    async markAllAsRead(targetId: string): Promise<void> {
        
        await NotificationModel.updateMany({ $or: [{ gymId: targetId }, { targetRole: 'super-admin' }], isRead: false }, { isRead: true });
    }
}
