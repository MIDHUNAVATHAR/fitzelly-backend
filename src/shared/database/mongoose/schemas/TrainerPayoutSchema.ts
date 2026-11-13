import { Schema } from "mongoose";
import { ITrainerPayoutDocument } from "../types/ITrainerPayoutDocument";

export const TrainerPayoutSchema = new Schema<ITrainerPayoutDocument>({
    gymId: { type: String, required: true },
    trainerId: { type: String, required: true },
    amount: { type: Number, required: true },
    notes: { type: String, default: null },
    date: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

TrainerPayoutSchema.index({ gymId: 1, date: -1 });
TrainerPayoutSchema.index({ trainerId: 1 });
