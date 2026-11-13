import { AnalyticsRepository } from "./infrastructure/repositories/AnalyticsRepository";
import { SuperAdminRepository } from "./infrastructure/repositories/SuperAdminRepository";

import { GetGymAnalyticsUseCase } from "./application/use-cases/GetGymAnalyticsUseCase";
import { GetGymDashboardUseCase } from "./application/use-cases/GetGymDashboardUseCase";
import { GetSuperAdminDashboardUseCase } from "./application/use-cases/GetSuperAdminDashboardUseCase";
import { GetSuperAdminProfileUseCase } from "./application/use-cases/GetSuperAdminProfileUseCase";
import { UpdateSuperAdminProfileUseCase } from "./application/use-cases/UpdateSuperAdminProfileUseCase";
import { UpdateSuperAdminLogoUseCase } from "./application/use-cases/UpdateSuperAdminLogoUseCase";

import { GymAnalyticsController } from "./presentation/controllers/GymAnalyticsController";
import { DashboardController } from "./presentation/controllers/DashboardController";
import { SuperAdminDashboardController } from "./presentation/controllers/SuperAdminDashboardController";
import { SuperAdminProfileController } from "./presentation/controllers/SuperAdminProfileController";
import { createAnalyticsRouter } from "./presentation/routes/analytics.routes";

import { IS3Service } from "../../shared/services/IS3Service";

export interface AnalyticsModuleDependencies {
    s3Service: IS3Service;
    analyticsRepository?: AnalyticsRepository;
    superAdminRepository?: SuperAdminRepository;
}

export function initAnalyticsModule(deps: AnalyticsModuleDependencies) {
    const analyticsRepository = deps.analyticsRepository ?? new AnalyticsRepository();
    const superAdminRepository = deps.superAdminRepository ?? new SuperAdminRepository();

    const getGymAnalyticsUseCase = new GetGymAnalyticsUseCase(analyticsRepository);
    const getGymDashboardUseCase = new GetGymDashboardUseCase(analyticsRepository);
    const getSuperAdminDashboardUseCase = new GetSuperAdminDashboardUseCase(analyticsRepository);

    const getSuperAdminProfileUseCase = new GetSuperAdminProfileUseCase(superAdminRepository);
    const updateSuperAdminProfileUseCase = new UpdateSuperAdminProfileUseCase(superAdminRepository);
    const updateSuperAdminLogoUseCase = new UpdateSuperAdminLogoUseCase(superAdminRepository, deps.s3Service);

    const gymAnalyticsController = new GymAnalyticsController(getGymAnalyticsUseCase);
    const dashboardController = new DashboardController(getGymDashboardUseCase);
    const superAdminDashboardController = new SuperAdminDashboardController(getSuperAdminDashboardUseCase);
    const superAdminProfileController = new SuperAdminProfileController(
        getSuperAdminProfileUseCase,
        updateSuperAdminProfileUseCase,
        updateSuperAdminLogoUseCase
    );

    const router = createAnalyticsRouter({
        gymAnalyticsController,
        dashboardController,
        superAdminDashboardController,
        superAdminProfileController,
    });

    return {
        router,
        repositories: {
            analyticsRepository,
            superAdminRepository,
        },
        controllers: {
            gymAnalyticsController,
            dashboardController,
            superAdminDashboardController,
            superAdminProfileController,
        },
        useCases: {
            getGymAnalyticsUseCase,
            getGymDashboardUseCase,
            getSuperAdminDashboardUseCase,
            getSuperAdminProfileUseCase,
            updateSuperAdminProfileUseCase,
            updateSuperAdminLogoUseCase,
        },
    };
}
