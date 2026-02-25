

export interface AddClientRequestDTO {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    emergencyContact: string;
    contactPerson: string;
    gymId: string;
}

export interface GetClientResponseDTO {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    dateOfBirth: string | null;
    profileUrl: string | null;
    emergencyContact: string | null;
    contactPerson: string | null;
    currentPlan: string | null;
    membershipStatus: string;
    joinedDate: string;
    isEmailVerified: boolean;
}

/**
 * update client dtos
 */
export interface UpdateClientByGymRequestDTO {
    fullName: string;
    phoneNumber: string;
    dateOfBirth: string;
    emergencyContact: string;
    contactPerson: string;
    email?: string;
}
