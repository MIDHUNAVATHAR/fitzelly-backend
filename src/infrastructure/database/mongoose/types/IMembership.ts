import { Document } from "mongoose";

export interface IMembership extends Document {
    clientId: string;
    clientName: string;
    gymId: string;
    planId: string;
    planName: string;
    planAmount: number;
    planType: 'DAY_BASED' | 'CATEGORY_BASED';
    startDate: Date;
    expiryDate: Date | null;
    status: 'ACTIVE' | 'EXPIRED';
    daysLeft: number | null;
    assignedTrainerId: string | null;
    assignedTrainerName: string | null;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
