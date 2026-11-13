import { NotificationRepository } from "./infrastructure/repositories/NotificationRepository";

import {
    AddNotificationUseCase,
    GetNotificationsUseCase,
    MarkNotificationUseCase,
} from "./application/use-cases/NotificationUseCases";

import { NotificationController } from "./presentation/controllers/NotificationController";
import { createNotificationsRouter } from "./presentation/routes/notifications.routes";

import { ISocketService } from "../../shared/services/ISocketService";

export interface NotificationsModuleDependencies {
    socketService: ISocketService;
    notificationRepository?: NotificationRepository;
}

export function initNotificationsModule(deps: NotificationsModuleDependencies) {
    const notificationRepository = deps.notificationRepository ?? new NotificationRepository();

    const addNotificationUseCase = new AddNotificationUseCase(notificationRepository, deps.socketService);
    const getNotificationsUseCase = new GetNotificationsUseCase(notificationRepository);
    const markNotificationUseCase = new MarkNotificationUseCase(notificationRepository);

    const notificationController = new NotificationController(
        getNotificationsUseCase,
        markNotificationUseCase
    );

    const router = createNotificationsRouter({
        notificationController,
    });

    return {
        router,
        repositories: {
            notificationRepository,
        },
        controllers: {
            notificationController,
        },
        useCases: {
            addNotificationUseCase,
            getNotificationsUseCase,
            markNotificationUseCase,
        },
    };
}
