import { Schema } from "mongoose";
import { IWeightLogDocument } from "../types/IWeightLogDocument";

export const WeightLogSchema = new Schema<IWeightLogDocument>({
    clientId: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    bmi: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now }
}, {
    timestamps: true
});

WeightLogSchema.index({ clientId: 1, date: -1 });
