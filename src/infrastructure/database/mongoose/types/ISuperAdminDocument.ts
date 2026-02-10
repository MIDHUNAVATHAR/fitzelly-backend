import { Document } from "mongoose";

export interface ISuperAdminDocument extends Document {
    email: string;
    password: string;
    role: string;
    logoUrl: string;
    appName: string;
    caption: string;
    contactEmail: string;
    phoneNumber: string;
    description: string;
}