import mongoose, {Document} from "mongoose";


export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    gymId?: mongoose.Types.ObjectId | null;
    role: string;
    device: string;
    browser: string;
    os: string;
    ip: string;
    lastActive: Date;
    expiredAt: Date;
    isRevoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

