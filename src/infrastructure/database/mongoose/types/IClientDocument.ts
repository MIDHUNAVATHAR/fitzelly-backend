import { Document } from "mongoose";

export interface IClientDocument extends Document {
    gymId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth?: Date;
    emergencyContact?: string;
    password: string;
    profileUrl: string;
    contactPerson?: string;
    isEmailVerified: boolean;
    joinedDate: Date;
    isDeleted: boolean;
    clientId?: string;
    height?: number;
    weight?: number;
    gender?: string;
}

