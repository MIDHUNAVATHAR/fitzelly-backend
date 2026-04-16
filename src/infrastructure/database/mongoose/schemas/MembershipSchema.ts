import { Schema } from "mongoose";
import type { IMembership } from "../types/IMembership";

const membershipSchema = new Schema<IMembership>(
    {
        clientId: { type: String, required: true },
        clientName: { type: String, required: true },
        gymId: { type: String, required: true },
        planId: { type: String, required: true },
        planName: { type: String, required: true },
        planAmount: { type: Number, required: true },
        planType: { type: String, enum: ['DAY_BASED', 'CATEGORY_BASED'], required: true },
        startDate: { type: Date, required: true },
        expiryDate: { type: Date, default: null },
        status: { type: String, enum: ['ACTIVE', 'EXPIRED'], default: 'ACTIVE' },
        daysLeft: { type: Number, default: null },
        assignedTrainerId: { type: String, default: null },
        assignedTrainerName: { type: String, default: null },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default membershipSchema;
