import { IAnalyticsRepository, SuperAdminDashboardData } from "../../../domain/repositories/IAnalyticsRepository";
import { IGetSuperAdminDashboardUseCase } from "../../IUseCases/superAdmin-dashboard/ISuperAdminDashboardUseCases";

export class GetSuperAdminDashboardUseCase implements IGetSuperAdminDashboardUseCase {
    constructor(private _analyticsRepository: IAnalyticsRepository) { }

    async execute(): Promise<SuperAdminDashboardData> {
        return this._analyticsRepository.getSuperAdminDashboardData();
    }
}
