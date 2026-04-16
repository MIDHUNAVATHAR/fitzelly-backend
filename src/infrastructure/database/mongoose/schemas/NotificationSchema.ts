import { Schema } from 'mongoose';
const NotificationSchema = new Schema({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: { type: String, required: true },
    targetRole: { type: String, default: 'GYM' },
}, { timestamps: true });
export default NotificationSchema;
