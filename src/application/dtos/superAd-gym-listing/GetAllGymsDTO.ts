import type { ApprovalStatus } from "../../../domain/entities/Gym";
import type { SubscriptionStatus } from "../../../domain/entities/Gym";


export interface GymResponseDTO {
    _id: string;
    gymName?: string;
    email: string;
    phone?: string;
    address?: string;
    approvalStatus: ApprovalStatus;
    subscriptionStatus: SubscriptionStatus;
    expiryDate?: string;
    logoUrl?: string;
    caption?: string;
    description?: string;
    location?: { latitude: number, longitude: number };
    createdAt: string;
    latestSubscription?: {
        planName: string;
        amount: number;
        startDate: Date;
        endDate: Date;
        status: string;
        paymentGateway: string | null;
        gatewayPaymentId: string | null;
    }
}

export interface GymsListResponseDTO {
    gyms: GymResponseDTO[];
    totalPages: number;
    currentPage: number;
    totalGyms: number;
}

export interface GymUpdateRequestDTO {
    approvalStatus?: 'Approved' | 'Pending' | 'Rejected';
    subscriptionStatus?: 'Active' | 'Trial' | 'Expired' | 'Pending';
    expiryDate?: string;
}