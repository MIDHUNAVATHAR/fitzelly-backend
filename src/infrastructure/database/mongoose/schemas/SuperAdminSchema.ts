import { Schema } from "mongoose";
import { ISuperAdminDocument } from "../types/ISuperAdminDocument";
import { ROLES } from "../../../../constants/roles.constants";

export const SuperAdminSchema = new Schema<ISuperAdminDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: ROLES.SUPERADMIN
    },
    logoUrl: {
        type: String,
        default: ""
    },
    appName: {
        type: String,
        default: ""
    },
    caption: {
        type: String,
        default: ""
    },
    contactEmail: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true })


