import { Document } from "mongoose";

export interface IOtpDocument extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
}

