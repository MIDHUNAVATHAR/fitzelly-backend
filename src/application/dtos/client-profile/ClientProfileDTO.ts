export interface ClientProfileDTO {
    id?: string;
    gymId?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string | null;
    emergencyContact?: string | null;
    contactPerson?: string | null;
    dateOfBirth?: string | null;
    profileUrl?: string | null;
    joinedDate?: string;
    isEmailVerified:boolean
}

export interface UpdateClientProfileRequestDTO {
    fullName?: string;
    phoneNumber?: string;
    emergencyContact?: string;
    contactPerson?: string;
    dateOfBirth?: string;
}

export interface ClientMembershipDTO {
    id?: string;
    planName: string;
    planType: 'category-based' | 'day-based';
    startDate: string;
    expiryDate?: string;
    daysLeft?: number;
}

export interface ClientProfileWithMembershipResponseDTO {
    profile: ClientProfileDTO & {
        emergencyContactNumber: string | null;
    };
    membership: {
        currentPlan: string;
        planType: string;
        startDate: string;
        expiryDate: string | null;
        status: 'ACTIVE' | 'EXPIRED';
        daysLeft: number | null;
        assignedTrainer: string | null;
        assignedTrainerId: string | null;
        paymentStatus?: 'PAID' | 'PARTIAL' | 'UNPAID' | null;
        payments?: { date: string, amount: number }[];
    } | null;
}
