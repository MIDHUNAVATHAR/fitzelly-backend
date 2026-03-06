import { Document, Types } from "mongoose";

export interface ITrainerDocument extends Document {
    gymId: Types.ObjectId;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;

    dateOfBirth: Date;
    specialization: string;
    profileUrl: string;
    joinedDate: Date;
    salary: number;
    assignedClients: Types.ObjectId[];

    qualification: string;
    address: string;
    certificates: string[];

    isEmailVerified: boolean;
    isDeleted: boolean;

    createdAt: Date;
    updatedAt: Date;
}