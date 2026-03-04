import mongoose from "mongoose";

export interface IPlan extends Document {
    gymId: mongoose.Types.ObjectId;
    planName: string;
    planType: 'DAY_BASED' | 'CATEGORY_BASED';
    validity: number;
    price: number;
    windowPeriod: number;
    description?: string;
    isDeleted: boolean;
}