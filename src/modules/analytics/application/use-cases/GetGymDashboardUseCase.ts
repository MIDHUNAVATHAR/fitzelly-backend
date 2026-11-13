import { IAnalyticsRepository, DashboardData } from "../../domain/repositories/IAnalyticsRepository";
import { IGetGymDashboardUseCase } from "../interfaces/IGymDashboardUseCases";

export class GetGymDashboardUseCase implements IGetGymDashboardUseCase {
    constructor(private _analyticsRepository: IAnalyticsRepository) {}

    async execute(gymId: string): Promise<DashboardData> {
        return await this._analyticsRepository.getGymDashboardData(gymId);
    }
}


