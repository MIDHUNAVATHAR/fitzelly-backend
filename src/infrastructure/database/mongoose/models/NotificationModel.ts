import mongoose from 'mongoose';
import NotificationSchema from '../schemas/NotificationSchema';
export const NotificationModel = mongoose.model('Notification', NotificationSchema);
