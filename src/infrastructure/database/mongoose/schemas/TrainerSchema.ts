import { Schema } from "mongoose";
import { ITrainerDocument } from "../types/ITrainerDocument";

export const TrainerSchema = new Schema<ITrainerDocument>({
    gymId: {
        type: Schema.Types.ObjectId,
        ref: "Gym",
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    dateOfBirth: {
        type: Date,
    },
    specialization: {
        type: String,
        default: ""
    },
    profileUrl: {
        type: String,
        default: ""
    },
    joinedDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        default: 0
    },
    assignedClients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })