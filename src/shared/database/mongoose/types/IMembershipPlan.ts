import { Document, Types } from "mongoose";

export interface IPlan extends Document {
    gymId: Types.ObjectId;
    planName: string;
    planType: 'DAY_BASED' | 'CATEGORY_BASED';
    validity: number;
    price: number;
    windowPeriod: number;
    description?: string;
    isDeleted: boolean;
}