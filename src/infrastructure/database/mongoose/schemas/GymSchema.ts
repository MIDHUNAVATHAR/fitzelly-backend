import { Schema } from "mongoose";
import { IGymDocument } from "../types/IGymDocument";
import { ROLES } from "../../../../constants/roles.constants";


export const GymSchema = new Schema<IGymDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: ROLES.GYM
    },
    logoUrl: {
        type: String,
        default: ""
    },
    gymName: {
        type: String,
        default: ""
    },
    caption: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    location: {
        latitude: {
            type: Number,
            default: 0
        },
        longitude: {
            type: Number,
            default: 0
        }
    }
}, { timestamps: true }); 
