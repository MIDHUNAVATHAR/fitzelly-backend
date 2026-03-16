import { Schema } from "mongoose";
import { IWorkoutLogDocument } from "../types/IWorkoutLogDocument";

export const WorkoutLogSchema = new Schema<IWorkoutLogDocument>({
    clientId: {
        type: String,
        required: true,
        ref: "Client"
    },
    date: {
        type: Date,
        required: true
    },
    completedExercises: {
        type: [String],
        default: []
    }
}, { timestamps: true });

//ensure one log per client per day
WorkoutLogSchema.index({ clientId: 1, date: 1 }, { unique: true })