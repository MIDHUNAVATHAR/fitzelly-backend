import { ClientRepository } from "./infrastructure/repositories/ClientRepository";

import { AddClientUseCase } from "./application/use-cases/AddClientUseCase";
import { GetClientsUseCase } from "./application/use-cases/GetClientsUseCase";
import { GetClientByIdUseCase } from "./application/use-cases/GetClientByIdUseCase";
import { UpdateClientByGymUseCase } from "./application/use-cases/UpdateClientByGymUseCase";
import { DeleteClientUseCase } from "./application/use-cases/DeleteClientUseCase";

import { GetClientProfileWithMembershipUseCase } from "./application/use-cases/GetClientProfileWithMembershipUseCase";
import { UpdateClientProfileUseCase } from "./application/use-cases/UpdateClientProfileUseCase";
import { UpdateClientProfileImageUseCase } from "./application/use-cases/UpdateClientProfileImageUseCase";
import { GetClientGymDetailsUseCase } from "./application/use-cases/GetClientGymDetailsUseCase";
import { GetClientAssignedTrainerUseCase } from "./application/use-cases/GetClientAssignedTrainerUseCase";

import { GymClientController } from "./presentation/controllers/GymClientController";
import { ClientProfileController } from "./presentation/controllers/ClientProfileController";
import { createClientsRouter } from "./presentation/routes/clients.routes";

import { IGymRepository } from "../gyms/domain/repositories/IGymRepository";
import { ITrainerRepository } from "../trainers/domain/repositories/ITrainerRepository";
import { IMembershipRepository } from "../memberships/domain/repositories/IMembershipRepository";
import { IPaymentRepository } from "../payments/domain/repositories/IPaymentRepository";
import { IS3Service } from "../../shared/services/IS3Service";
import { ISendWelcomeEmailUseCase } from "../auth/application/interfaces/ISendWelcomeEmailUseCase";

export interface ClientsModuleDependencies {
    gymRepository: IGymRepository;
    trainerRepository: ITrainerRepository;
    membershipRepository: IMembershipRepository;
    paymentRepository: IPaymentRepository;
    s3Service: IS3Service;
    sendWelcomeEmailUseCase: ISendWelcomeEmailUseCase;
    clientRepository?: ClientRepository;
}

export function initClientsModule(deps: ClientsModuleDependencies) {
    const clientRepository = deps.clientRepository ?? new ClientRepository();

    const addClientUseCase = new AddClientUseCase(clientRepository);
    const getClientsUseCase = new GetClientsUseCase(clientRepository, deps.membershipRepository);
    const getClientByIdUseCase = new GetClientByIdUseCase(clientRepository, deps.membershipRepository, deps.paymentRepository);
    const updateClientUseCase = new UpdateClientByGymUseCase(clientRepository);
    const deleteClientUseCase = new DeleteClientUseCase(clientRepository);

    const getClientProfileWithMembershipUseCase = new GetClientProfileWithMembershipUseCase(
        clientRepository,
        deps.membershipRepository,
        deps.paymentRepository
    );
    const updateClientProfileUseCase = new UpdateClientProfileUseCase(clientRepository);
    const updateClientProfileImageUseCase = new UpdateClientProfileImageUseCase(clientRepository, deps.s3Service);
    const getClientGymDetailsUseCase = new GetClientGymDetailsUseCase(clientRepository, deps.gymRepository);
    const getClientAssignedTrainerUseCase = new GetClientAssignedTrainerUseCase(clientRepository, deps.trainerRepository);

    const gymClientController = new GymClientController(
        addClientUseCase,
        getClientsUseCase,
        getClientByIdUseCase,
        updateClientUseCase,
        deleteClientUseCase,
        deps.sendWelcomeEmailUseCase
    );

    const clientProfileController = new ClientProfileController(
        getClientProfileWithMembershipUseCase,
        updateClientProfileUseCase,
        updateClientProfileImageUseCase,
        getClientGymDetailsUseCase,
        getClientAssignedTrainerUseCase
    );

    const router = createClientsRouter({
        gymClientController,
        clientProfileController,
    });

    return {
        router,
        repositories: {
            clientRepository,
        },
        controllers: {
            gymClientController,
            clientProfileController,
        },
        useCases: {
            addClientUseCase,
            getClientsUseCase,
            getClientByIdUseCase,
            updateClientUseCase,
            deleteClientUseCase,
            getClientProfileWithMembershipUseCase,
            updateClientProfileUseCase,
            updateClientProfileImageUseCase,
            getClientGymDetailsUseCase,
            getClientAssignedTrainerUseCase,
        },
    };
}
