
import { Document } from "mongoose";

export interface IEnquiryDocument extends Document {
    gymId: string;
    fullName: string;
    phoneNumber: string;
    email: string | null;
    status: "PENDING" | "CONTACTED" | "CONVERTED";
    date: Date;
    isDeleted: boolean;
}
