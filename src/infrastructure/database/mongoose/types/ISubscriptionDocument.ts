import { Document, Types } from "mongoose";

export interface ISubscriptionDocument extends Document {
    gymId: Types.ObjectId;
    gymName: string;
    planName: string;
    amount: number;
    startDate: Date;
    endDate: Date;
    status: "active" | "expired";
    paymentGateway: string | null;
    gatewayPaymentId: string | null;
    gatewayOrderId: string | null;
    createdAt: Date;
}
