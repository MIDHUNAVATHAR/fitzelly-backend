import { Schema } from "mongoose";
import { IOtpDocument } from "../types/IOtpDocument";

export const OtpSchema = new Schema<IOtpDocument>({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, expires: 0 } //delete doc after 0 seconds from expiresAt
})