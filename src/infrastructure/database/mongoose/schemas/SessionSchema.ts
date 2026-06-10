import { Schema } from "mongoose";
import { ISession } from "../types/ISessionDocument";


 const SessionSchema = new Schema<ISession>({
    userId: { type: Schema.Types.ObjectId, required: true },
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym' },
    role: { type: String, required: true },
    device: { type: String, default: 'Unknown' },
    browser: { type: String, default: 'Unknown' },
    os: { type: String, default: 'Unknown' },
    ip: { type: String, default: 'Unknown' },
    lastActive: { type: Date, default: Date.now },
    expiredAt: { type: Date, required: true },
    isRevoked: { type: Boolean, default: false }
}, { timestamps: true });


export default SessionSchema