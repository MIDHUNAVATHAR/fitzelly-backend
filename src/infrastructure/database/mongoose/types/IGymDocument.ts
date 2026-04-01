import { Document } from "mongoose";

export interface IGymCertificate {
    url: string;
    type: 'IMAGE' | 'PDF';
    name: string;
    key: string;
}

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
    certificates: IGymCertificate[];
    rejectionReason?: string;
    createdAt: Date;
    isDeleted: boolean;
}