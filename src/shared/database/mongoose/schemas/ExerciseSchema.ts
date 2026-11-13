import { Schema } from "mongoose";
import { IExerciseDocument } from "../types/IExerciseDocument";

export const ExerciseSchema = new Schema<IExerciseDocument>({
    gymId: {
        type: String,
        required: false,
        ref: "Gym"
    },
    name: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        default: ""
    },
    reps: {
        type: String,
        default: ""
    },
    sets: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
