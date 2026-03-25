export interface GymAnalyticsData {
    monthlyRevenue: { month: string; revenue: number }[];
    planRevenue: { name: string; value: number }[];
    paymentStatus: { status: 'Paid' | 'Pending'; value: number }[];
    retention: {
        totalClients: number;
        activeClients: number;
        inactiveClients: number;
    }
}

export interface DashboardData {
    todayCheckins: { client: number; trainer: number };
    monthRevenue: number;
    monthJoinees: number;
    expiries: { clientId: string; name: string; expiryDate: Date; daysRemaining: number }[];
    birthdays: { name: string; role: 'CLIENT' | 'TRAINER'; userId: string }[];
    inactiveClients: { clientId: string; name: string; lastCheckIn: Date | null; daysSinceLastSeen: number }[];
}

export interface IAnalyticsRepository {
    getGymAnalytics(gymId: string): Promise<GymAnalyticsData>;
    getGymDashboardData(gymId: string): Promise<DashboardData>;
}
