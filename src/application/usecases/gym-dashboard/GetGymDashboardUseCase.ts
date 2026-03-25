import { IAnalyticsRepository, DashboardData } from "../../../domain/repositories/IAnalyticsRepository";

export class GetGymDashboardUseCase {
    constructor(private analyticsRepository: IAnalyticsRepository) {}

    async execute(gymId: string): Promise<DashboardData> {
        return await this.analyticsRepository.getGymDashboardData(gymId);
    }
}
