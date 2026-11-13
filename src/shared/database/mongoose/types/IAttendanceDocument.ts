import { Document } from "mongoose";

export interface IAttendanceDocument extends Document {
    userId: string;
    gymId: string;
    date: Date;
    logs: {
        checkIn: Date;
        checkOut?: Date;
    }[];
    status: "PENDING" | "PRESENT" | "ABSENT";
    userType: "CLIENT" | "TRAINER";
    isDeleted: boolean
}

