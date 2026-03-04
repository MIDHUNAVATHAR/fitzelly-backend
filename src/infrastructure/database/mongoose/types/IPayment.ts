import { Document } from "mongoose";

export interface IPayment extends Document {
    membershipId: string;
    amount: number;
    paymentDate: Date;
    note: string | null;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}