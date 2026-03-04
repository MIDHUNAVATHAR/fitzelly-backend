import mongoose from "mongoose";

export interface IEquipment extends Document {
    gymId: mongoose.Types.ObjectId;
    name: string;
    description: string;
    image: string;
    startBookingTime: number;
    availableDays: string[];
    availableFrom: string;
    availableTo: string;
    allowedPlans: mongoose.Types.ObjectId[];
    maxUsageMinutes: number;
    capacity: number;
    slotIntervalMinutes: number;
    isActive: boolean;
    isDeleted: boolean;
}