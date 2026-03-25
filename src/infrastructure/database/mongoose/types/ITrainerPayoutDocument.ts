import { Document } from "mongoose";

export interface ITrainerPayoutDocument extends Document {
    gymId: string;
    trainerId: string;
    amount: number;
    notes: string | null;
    date: Date;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
