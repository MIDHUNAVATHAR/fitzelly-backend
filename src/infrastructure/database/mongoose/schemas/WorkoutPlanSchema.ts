import { Schema } from "mongoose";
import { IWorkoutPlanDocument } from "../types/IWorkoutPlanDocument";

const ExerciseSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    reps: { type: String, required: true },
    sets: { type: String, required: true },
    videoUrl: { type: String, default: "" }
}, { _id: false });

const DayPlanSchema = new Schema({
    day: {
        type: String,
        required: true,
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    exercises: [ExerciseSchema]
}, { _id: false });

export const WorkoutPlanSchema = new Schema<IWorkoutPlanDocument>({
    clientId: {
        type: String,
        required: true,
        ref: "Client"
    },
    trainerId: {
        type: String,
        required: true,
        ref: "Trainer"
    },
    gymId: {
        type: String,
        required: true,
        ref: "Gym"
    },
    weeklyPlan: [DayPlanSchema],
    weekStartDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    notes: {
        type: String,
        default: ""
    }
}, { timestamps: true });
