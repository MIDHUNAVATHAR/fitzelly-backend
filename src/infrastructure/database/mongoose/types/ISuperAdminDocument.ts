import { Document } from "mongoose";

export interface ISuperAdminDocument extends Document {
    email: string;
    password: string;
    role: string;
}