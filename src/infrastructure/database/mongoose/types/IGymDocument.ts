import { Document } from "mongoose";

export interface IGymDocument extends Document {
    email: string;
    password: string;
    role: string;
    logoUrl: string;
    gymName: string;
    caption: string;
    phoneNumber: string;
    address: string;
    description: string;
    location: { latitude: number, longitude: number };
    approvalStatus: 'Approved' | 'Pending' | 'Rejected';
    subscriptionStatus: 'Active' | 'Trial' | 'Expired' | 'Pending';
    expiryDate: Date;
    createdAt: Date;
    isDeleted: boolean;
}