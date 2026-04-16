import { IAnalyticsRepository, SuperAdminDashboardData } from "../../../domain/repositories/IAnalyticsRepository";

export class GetSuperAdminDashboardUseCase {
    constructor(private analyticsRepository: IAnalyticsRepository) { }

    async execute(): Promise<SuperAdminDashboardData> {
        return this.analyticsRepository.getSuperAdminDashboardData();
    }
}
