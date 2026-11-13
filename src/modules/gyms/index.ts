import { GymRepository } from "./infrastructure/repositories/GymRepository";

import { GetGymProfileUseCase } from "./application/use-cases/GetGymProfileUseCase";
import { UpdateGymProfileUseCase } from "./application/use-cases/UpdateGymProfileUseCase";
import { UpdateGymLogoUseCase } from "./application/use-cases/UpdateGymLogoUseCase";
import { UploadGymCertificateUseCase } from "./application/use-cases/UploadGymCertificateUseCase";
import { DeleteGymCertificateUseCase } from "./application/use-cases/DeleteGymCertificateUseCase";
import { ReApplyGymUseCase } from "./application/use-cases/ReApplyGymUseCase";

import { GetAllGymsUseCase } from "./application/use-cases/GetAllGymsUseCase";
import { GetGymByIdUseCase } from "./application/use-cases/GetGymByIdUseCase";
import { ApproveGymUseCase } from "./application/use-cases/ApproveGymUseCase";
import { RejectGymUseCase } from "./application/use-cases/RejectGymUseCase";
import { UpdateGymSubscriptionUseCase } from "./application/use-cases/UpdateGymSubscriptionUseCase";

import { GymProfileController } from "./presentation/controllers/GymProfileController";
import { SuperAdminGymsController } from "./presentation/controllers/SuperAdminGymsController";
import { createGymsRouter } from "./presentation/routes/gyms.routes";

import { IS3Service } from "../../shared/services/IS3Service";
import { IEmailService } from "../../shared/services/IEmailService";
import { ISubscriptionRepository } from "../subscriptions/domain/repositories/ISubscriptionRepository";
import { ISuperAdminRepository } from "../analytics/domain/repositories/ISuperAdminRepository";
import { AddNotificationUseCase } from "../notifications/application/use-cases/NotificationUseCases";

export interface GymsModuleDependencies {
    s3Service: IS3Service;
    emailService: IEmailService;
    subscriptionRepository: ISubscriptionRepository;
    superAdminRepository: ISuperAdminRepository;
    addNotificationUseCase: AddNotificationUseCase;
    gymRepository?: GymRepository;
}

export function initGymsModule(deps: GymsModuleDependencies) {
    const gymRepository = deps.gymRepository ?? new GymRepository();

    const getGymProfileUseCase = new GetGymProfileUseCase(gymRepository, deps.subscriptionRepository);
    const updateGymProfileUseCase = new UpdateGymProfileUseCase(gymRepository);
    const updateGymLogoUseCase = new UpdateGymLogoUseCase(gymRepository, deps.s3Service);
    const uploadGymCertificateUseCase = new UploadGymCertificateUseCase(gymRepository, deps.s3Service);
    const deleteGymCertificateUseCase = new DeleteGymCertificateUseCase(gymRepository, deps.s3Service);
    const reApplyGymUseCase = new ReApplyGymUseCase(gymRepository, deps.addNotificationUseCase);

    const getAllGymsUseCase = new GetAllGymsUseCase(gymRepository, deps.subscriptionRepository);
    const getGymByIdUseCase = new GetGymByIdUseCase(gymRepository, deps.subscriptionRepository);
    const approveGymUseCase = new ApproveGymUseCase(gymRepository, deps.superAdminRepository, deps.subscriptionRepository);
    const rejectGymUseCase = new RejectGymUseCase(gymRepository);
    const updateGymSubscriptionUseCase = new UpdateGymSubscriptionUseCase(gymRepository, deps.subscriptionRepository);

    const gymProfileController = new GymProfileController(
        getGymProfileUseCase,
        updateGymProfileUseCase,
        updateGymLogoUseCase,
        uploadGymCertificateUseCase,
        deleteGymCertificateUseCase,
        reApplyGymUseCase
    );

    const superAdminGymsController = new SuperAdminGymsController(
        getAllGymsUseCase,
        getGymByIdUseCase,
        approveGymUseCase,
        rejectGymUseCase,
        updateGymSubscriptionUseCase
    );

    const router = createGymsRouter({
        gymProfileController,
        superAdminGymsController,
    });

    return {
        router,
        repositories: {
            gymRepository,
        },
        controllers: {
            gymProfileController,
            superAdminGymsController,
        },
        useCases: {
            getGymProfileUseCase,
            updateGymProfileUseCase,
            updateGymLogoUseCase,
            uploadGymCertificateUseCase,
            deleteGymCertificateUseCase,
            reApplyGymUseCase,
            getAllGymsUseCase,
            getGymByIdUseCase,
            approveGymUseCase,
            rejectGymUseCase,
            updateGymSubscriptionUseCase,
        },
    };
}
