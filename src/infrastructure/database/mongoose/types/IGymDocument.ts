import { Document } from "mongoose";

export interface IGymDocument extends Document {
    email: string;
    password: string;
    role: string;
}