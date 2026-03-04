import { Schema } from "mongoose";
import { IPlan } from "../types/IMembershipPlan";


export const planSchema = new Schema<IPlan>({
    gymId: { type: Schema.Types.ObjectId, ref: "Gym", required: true },
    planName: { type: String, required: true },
    planType: { type: String, enum: ['DAY_BASED', 'CATEGORY_BASED'], required: true },
    validity: { type: Number, required: true },
    price: { type: Number, required: true },
    windowPeriod: { type: Number, default: 0 },
    description: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});
