import { Schema } from "mongoose";
import { IEquipmentBooking } from "../types/IEquipmentBooking";

export const equipmentBookingSchema = new Schema<IEquipmentBooking>({
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    gymId: { type: Schema.Types.ObjectId, ref: "Gym", required: true },
    equipmentId: { type: Schema.Types.ObjectId, ref: "Equipment", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: ['BOOKED', 'CANCELLED'], default: 'BOOKED' },
}, {
    timestamps: true
});



equipmentBookingSchema.index({ equipmentId: 1, date: 1, startTime: 1 });
