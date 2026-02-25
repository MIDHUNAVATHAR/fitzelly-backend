
export interface TrainerRequestDTO {
    gymId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    specialization: string;
    salary: string;
    dateOfBirth: string;
}

export interface UpdateTrainerRequestDTO {
    fullName: string;
    phoneNumber: string;
    specialization: string;
    dateOfBirth: string;
    salary: string;
    email?: string;
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
    isEmailVerified: boolean
}