
export interface ClientMembershipDTO {
    id?: string;
    planName: string;
    planType: 'category-based' | 'day-based';
    startDate: string;
    expiryDate?: string;
    daysLeft?: number;
}

export interface AddMembershipDTO {
    gymId: string;
    clientId: string;
    planId: string;
    startDate: string;
    assignedTrainerId?: string;
    daysLeft?: number;
}