

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
    membershipStatus: string | null;
    planType?: 'DAY_BASED' | 'CATEGORY_BASED' | null;
    daysLeft?: number | null;
    startDate?: string | null;
    expiryDate?: string | null;
    assignedTrainer?: string | null;
    paymentStatus?: 'PAID' | 'PARTIAL' | 'UNPAID' | null;
    payments?: { date: string, amount: number }[];
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

