import { IAnalyticsRepository, GymAnalyticsData } from "../../../domain/repositories/IAnalyticsRepository";

export class GetGymAnalyticsUseCase {
    constructor(private analyticsRepository: IAnalyticsRepository) { }

    async execute(gymId: string): Promise<GymAnalyticsData> {
        return await this.analyticsRepository.getGymAnalytics(gymId);
    }
}
