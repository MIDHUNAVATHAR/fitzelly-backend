

export interface AddClientRequestDTO {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    emergencyContact: string;
    contactPerson: string;
    gymId: string;
    clientId?: string;
    height?: number;
    weight?: number;
    gender?: string;
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
    clientId?: string;
    height?: number | null;
    weight?: number | null;
    gender?: string | null;

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
    email: string;
    clientId?: string;
    height?: number;
    weight?: number;
    gender?: string;
}

