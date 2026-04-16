import { Document } from "mongoose";

export interface ISubscriptionPlanDocument extends Document {
    name: string;
    price: number;
    durationMonths: number;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
