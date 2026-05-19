import { DashboardData } from "../../../domain/repositories/IAnalyticsRepository";

export interface IGetGymDashboardUseCase {
    execute(gymId: string): Promise<DashboardData>;
}
