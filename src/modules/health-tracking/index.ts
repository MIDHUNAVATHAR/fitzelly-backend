import { WeightLogRepository } from "./infrastructure/repositories/WeightLogRepository";
import { AddWeightLogUseCase } from "./application/use-cases/AddWeightLogUseCase";
import { GetWeightLogsUseCase } from "./application/use-cases/GetWeightLogsUseCase";
import { HealthTrackingController } from "./presentation/controllers/HealthTrackingController";
import { createHealthTrackingRouter } from "./presentation/routes/health-tracking.routes";

export interface HealthTrackingModuleDependencies {
    weightLogRepository?: WeightLogRepository;
}

export function initHealthTrackingModule(deps?: HealthTrackingModuleDependencies) {
    const weightLogRepository = deps?.weightLogRepository ?? new WeightLogRepository();

    const addWeightLogUseCase = new AddWeightLogUseCase(weightLogRepository);
    const getWeightLogsUseCase = new GetWeightLogsUseCase(weightLogRepository);

    const healthTrackingController = new HealthTrackingController(addWeightLogUseCase, getWeightLogsUseCase);

    const router = createHealthTrackingRouter({ healthTrackingController });

    return {
        router,
        repositories: { weightLogRepository },
        controllers: { healthTrackingController },
        useCases: { addWeightLogUseCase, getWeightLogsUseCase },
    };
}
