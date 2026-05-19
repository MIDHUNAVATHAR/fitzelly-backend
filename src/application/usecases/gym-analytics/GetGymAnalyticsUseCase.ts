import { IAnalyticsRepository, GymAnalyticsData } from "../../../domain/repositories/IAnalyticsRepository";
import { IGetGymAnalyticsUseCase } from "../../IUseCases/gym-analytics/IGymAnalyticsUseCases";

export class GetGymAnalyticsUseCase implements IGetGymAnalyticsUseCase {
    constructor(private analyticsRepository: IAnalyticsRepository) { }

    async execute(gymId: string): Promise<GymAnalyticsData> {
        return await this.analyticsRepository.getGymAnalytics(gymId);
    }
}
