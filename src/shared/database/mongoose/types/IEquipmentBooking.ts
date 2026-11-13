import mongoose from "mongoose";

export interface IEquipmentBooking extends Document {
    clientId: mongoose.Types.ObjectId;
    gymId: mongoose.Types.ObjectId;
    equipmentId: mongoose.Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    status: 'BOOKED' | 'CANCELLED';
    createdAt: Date;
}
