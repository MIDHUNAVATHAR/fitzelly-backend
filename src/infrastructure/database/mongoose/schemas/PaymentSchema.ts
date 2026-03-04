import { Schema } from "mongoose";
import { IPayment } from "../types/IPayment";


const paymentSchema = new Schema<IPayment>(
    {
        membershipId: { type: String, required: true },
        amount: { type: Number, required: true },
        paymentDate: { type: Date, required: true },
        note: { type: String, default: null },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default paymentSchema;