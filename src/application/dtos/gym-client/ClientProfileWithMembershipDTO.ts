import { GetClientResponseDTO } from "./ClientDTO";

export interface ClientProfileWithMembershipResponseDTO {
    profile: Partial<GetClientResponseDTO>;
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

export interface AddPaymentDTO {
    gymId: string;
    membershipId: string;
    amount: number;
    paymentDate: string;
    note?: string;
}

export interface UpdatePaymentDTO {
    paymentId: string;
    amount?: number;
    paymentDate?: string;
    note?: string;
}