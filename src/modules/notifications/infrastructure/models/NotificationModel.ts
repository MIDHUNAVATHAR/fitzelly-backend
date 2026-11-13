import mongoose from 'mongoose';
import NotificationSchema from "../../../../shared/database/mongoose/schemas/NotificationSchema";
export const NotificationModel = mongoose.model('Notification', NotificationSchema);
