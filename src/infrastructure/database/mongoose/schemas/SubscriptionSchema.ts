import { Schema } from "mongoose";
import { ISubscriptionDocument } from "../types/ISubscriptionDocument";




export const SubscriptionSchema = new Schema<ISubscriptionDocument>({
    gymId: {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "expired"],
        required: true
    },
    paymentGateway: {
        type: String,
        default: null
    },
    gatewayPaymentId: {
        type: String,
        default: null
    },
    gatewayOrderId: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
