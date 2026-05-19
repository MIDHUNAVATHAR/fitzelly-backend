import { GymAnalyticsData } from "../../../domain/repositories/IAnalyticsRepository";

export interface IGetGymAnalyticsUseCase {
    execute(gymId: string): Promise<GymAnalyticsData>;
}
