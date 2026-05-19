import { SuperAdminDashboardData } from "../../../domain/repositories/IAnalyticsRepository";

export interface IGetSuperAdminDashboardUseCase {
    execute(): Promise<SuperAdminDashboardData>;
}
