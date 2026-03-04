import { Schema } from "mongoose";
import { IClientDocument } from "../types/IClientDocument";

export const ClientSchema = new Schema<IClientDocument>({
    gymId: {
        type: String,
        required: true,
        ref: "Gym"  //need for populate
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    profileUrl: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    emergencyContact: {
        type: String,
        default: ""
    },
    contactPerson: {
        type: String,
        default: ""
    },
    isEmailVerified: {
        type: Boolean,
        required: true
    },
   
    joinedDate: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

