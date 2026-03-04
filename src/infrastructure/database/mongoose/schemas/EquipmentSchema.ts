import { Schema } from "mongoose";
import { IEquipment } from "../types/IEquipment";


export const equipmentSchema = new Schema<IEquipment>({
    gymId: { type: Schema.Types.ObjectId, ref: "Gym", required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    startBookingTime: { type: Number, required: true },
    availableDays: { type: [String], required: true },
    availableFrom: { type: String, required: true },
    availableTo: { type: String, required: true },
    allowedPlans: [{ type: Schema.Types.ObjectId, ref: "Plan" }],
    maxUsageMinutes: { type: Number, required: true },
    capacity: { type: Number, required: true },
    slotIntervalMinutes: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});
