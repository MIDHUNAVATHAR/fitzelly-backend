
export interface ClientMembershipDTO {
    id?: string;
    planName: string;
    planType: 'category-based' | 'day-based';
    startDate: string;
    expiryDate?: string;
    daysLeft?: number;
}