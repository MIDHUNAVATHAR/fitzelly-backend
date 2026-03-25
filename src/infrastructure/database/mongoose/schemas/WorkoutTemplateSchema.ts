import { Schema } from "mongoose";
import { IWorkoutTemplateDocument } from "../types/IWorkoutTemplateDocument";

const DayTemplateSchema = new Schema({
    day: {
        type: String,
        required: true,
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }]
}, { _id: false });

export const WorkoutTemplateSchema = new Schema<IWorkoutTemplateDocument>({
    gymId: {
        type: String,
        required: true,
        ref: "Gym"
    },
    trainerId: {
        type: String,
        required: true,
        ref: "Trainer"
    },
    name: {
        type: String,
        required: true
    },
    days: [DayTemplateSchema]
}, { timestamps: true });
