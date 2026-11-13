import { Document } from "mongoose";

export interface IExpenseDocument extends Document {
    gymId: string;
    category: string;
    amount: number;
    notes: string | null;
    date: Date;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
