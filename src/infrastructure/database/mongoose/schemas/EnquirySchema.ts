
import { Schema } from "mongoose";
import { IEnquiryDocument } from "../types/IEnquiryDocument";

export const EnquirySchema = new Schema<IEnquiryDocument>({
    gymId: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, default: null },
    status: {
        type: String,
        enum: ["PENDING", "CONTACTED", "CONVERTED"],
        default: "PENDING"
    },
    date: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });

EnquirySchema.index({ gymId: 1, date: 1 });
EnquirySchema.index({ fullName: 'text', phoneNumber: 'text', email: 'text' });
