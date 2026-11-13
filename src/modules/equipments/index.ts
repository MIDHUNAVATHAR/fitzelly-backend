import { EquipmentRepository } from "./infrastructure/repositories/EquipmentRepository";
import { EquipmentBookingRepository } from "./infrastructure/repositories/EquipmentBookingRepository";

import { AddEquipmentUseCase } from "./application/use-cases/AddEquipmentUseCase";
import { GetEquipmentsUseCase } from "./application/use-cases/GetEquipmentsUseCase";
import { UpdateEquipmentUseCase } from "./application/use-cases/UpdateEquipmentUseCase";
import { DeleteEquipmentUseCase } from "./application/use-cases/DeleteEquipmentUseCase";

import { CreateEquipmentBookingUseCase } from "./application/use-cases/CreateEquipmentBookingUseCase";
import { GetAvailableSlotsUseCase } from "./application/use-cases/GetAvailableSlotsUseCase";
import { GetClientBookingsUseCase } from "./application/use-cases/GetClientBookingsUseCase";
import { CancelEquipmentBookingUseCase } from "./application/use-cases/CancelEquipmentBookingUseCase";

import { GymEquipmentController } from "./presentation/controllers/GymEquipmentController";
import { EquipmentBookingController } from "./presentation/controllers/EquipmentBookingController";
import { createEquipmentsRouter } from "./presentation/routes/equipments.routes";

import { IS3Service } from "../../shared/services/IS3Service";
import { IClientRepository } from "../clients/domain/repositories/IClientRepository";
import { AddNotificationUseCase } from "../notifications/application/use-cases/NotificationUseCases";

export interface EquipmentsModuleDependencies {
    s3Service: IS3Service;
    clientRepository: IClientRepository;
    addNotificationUseCase: AddNotificationUseCase;
    equipmentRepository?: EquipmentRepository;
    equipmentBookingRepository?: EquipmentBookingRepository;
}

export function initEquipmentsModule(deps: EquipmentsModuleDependencies) {
    const equipmentRepository = deps.equipmentRepository ?? new EquipmentRepository();
    const equipmentBookingRepository = deps.equipmentBookingRepository ?? new EquipmentBookingRepository();

    const addEquipmentUseCase = new AddEquipmentUseCase(equipmentRepository, deps.s3Service);
    const getEquipmentsUseCase = new GetEquipmentsUseCase(equipmentRepository);
    const updateEquipmentUseCase = new UpdateEquipmentUseCase(equipmentRepository, deps.s3Service);
    const deleteEquipmentUseCase = new DeleteEquipmentUseCase(equipmentRepository);

    const createEquipmentBookingUseCase = new CreateEquipmentBookingUseCase(
        equipmentBookingRepository,
        equipmentRepository,
        deps.clientRepository,
        deps.addNotificationUseCase
    );
    const getAvailableSlotsUseCase = new GetAvailableSlotsUseCase(equipmentRepository, equipmentBookingRepository);
    const getClientBookingsUseCase = new GetClientBookingsUseCase(equipmentBookingRepository);
    const cancelEquipmentBookingUseCase = new CancelEquipmentBookingUseCase(equipmentBookingRepository);

    const gymEquipmentController = new GymEquipmentController(
        addEquipmentUseCase,
        getEquipmentsUseCase,
        updateEquipmentUseCase,
        deleteEquipmentUseCase
    );

    const equipmentBookingController = new EquipmentBookingController(
        createEquipmentBookingUseCase,
        getAvailableSlotsUseCase,
        getClientBookingsUseCase,
        cancelEquipmentBookingUseCase
    );

    const router = createEquipmentsRouter({
        gymEquipmentController,
        equipmentBookingController,
    });

    return {
        router,
        repositories: {
            equipmentRepository,
            equipmentBookingRepository,
        },
        controllers: {
            gymEquipmentController,
            equipmentBookingController,
        },
        useCases: {
            addEquipmentUseCase,
            getEquipmentsUseCase,
            updateEquipmentUseCase,
            deleteEquipmentUseCase,
            createEquipmentBookingUseCase,
            getAvailableSlotsUseCase,
            getClientBookingsUseCase,
            cancelEquipmentBookingUseCase,
        },
    };
}
