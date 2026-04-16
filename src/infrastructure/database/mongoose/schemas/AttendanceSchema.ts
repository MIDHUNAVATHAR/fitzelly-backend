import { Schema } from "mongoose";
import { IAttendanceDocument } from "../types/IAttendanceDocument";

export const AttendanceSchema = new Schema<IAttendanceDocument>({
    userId: { type: String, required: true },
    gymId: { type: String, required: true },
    date: { type: Date, required: true },
    logs: [{
        checkIn: { type: Date, required: true },
        checkOut: { type: Date }
    }],
    status: {
        type: String,
        enum: ["PENDING", "PRESENT", "ABSENT"],
        default: "PENDING"
    },
    userType: {
        type: String,
        enum: ["CLIENT", "TRAINER"],
        required: true
    },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });


AttendanceSchema.index({ userId: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ gymId: 1, date: 1 })