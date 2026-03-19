import { Schema } from "mongoose";
import { IExpenseDocument } from "../types/IExpenseDocument";

export const ExpenseSchema = new Schema<IExpenseDocument>({
    gymId: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["RENT", "ELECTRICITY", "WATER", "INSURANCE_TAX", "MARKETING", "MAINTENANCE", "OTHER"]
    },
    amount: { type: Number, required: true },
    notes: { type: String, default: null },
    date: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

ExpenseSchema.index({ gymId: 1, date: -1 });
ExpenseSchema.index({ category: 1 });
