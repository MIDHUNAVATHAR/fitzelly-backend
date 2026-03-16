import { Express } from "express";

export interface UpdateTrainerProfileDTO {
    fullName: string;
    phoneNumber: string;
    specialization?: string;
    dateOfBirth?: string;
    profilePhoto?: Express.Multer.File;
    qualification?: string;
    address?: string;
}
