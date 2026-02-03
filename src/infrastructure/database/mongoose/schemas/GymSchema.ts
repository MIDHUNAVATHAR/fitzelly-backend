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
    }
}, { timestamps: true }); 
