import { IS3UploadFile } from "../../../domain/services/IS3Service";

export interface TrainerRequestDTO {
    gymId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    specialization: string;
    salary: string;
    dateOfBirth: string;
    qualification?: string;
    address?: string;
    certificates?: string[];
    certificateFiles?: IS3UploadFile[];
}

export interface UpdateTrainerRequestDTO {
    fullName: string;
    phoneNumber: string;
    specialization: string;
    dateOfBirth: string;
    salary: string;
    email?: string;
    qualification?: string;
    address?: string;
    certificates?: string[];
    newCertificateFiles?: IS3UploadFile[];
}

export interface TrainerResponseDTO {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    specialization: string;
    salary: string;
    dateOfBirth: string;
    joinedDate: string;
    isEmailVerified: boolean;
    qualification?: string;
    address?: string;
    certificates?: string[];
    gymId?: string;
    profileUrl?: string;
}