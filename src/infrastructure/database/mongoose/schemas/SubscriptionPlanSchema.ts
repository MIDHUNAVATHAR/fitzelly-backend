import { Schema } from "mongoose";
import { ISubscriptionPlanDocument } from "../types/ISubscriptionPlanDocument";

export const SubscriptionPlanSchema = new Schema<ISubscriptionPlanDocument>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    durationMonths: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
