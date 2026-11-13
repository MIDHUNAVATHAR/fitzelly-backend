import { TrainerRepository } from "./infrastructure/repositories/TrainerRepository";

import { AddTrainerUseCase } from "./application/use-cases/AddTrainerUseCase";
import { GetTrainersUseCase } from "./application/use-cases/GetTrainersUseCase";
import { GetTrainerByIdUseCase } from "./application/use-cases/GetTrainerByIdUseCase";
import { UpdateTrainerUseCase } from "./application/use-cases/UpdateTrainerUseCase";
import { DeleteTrainerUseCase } from "./application/use-cases/DeleteTrainerUseCase";

import { GetTrainerProfileUseCase } from "./application/use-cases/GetTrainerProfileUseCase";
import { UpdateTrainerProfileUseCase } from "./application/use-cases/UpdateTrainerProfileUseCase";
import { UpdateTrainerProfileImageUseCase } from "./application/use-cases/UpdateTrainerProfileImageUseCase";
import { GetTrainerGymDetailsUseCase } from "./application/use-cases/GetTrainerGymDetailsUseCase";
import { GetAssignedClientsUseCase } from "./application/use-cases/GetAssignedClientsUseCase";

import { GymTrainerController } from "./presentation/controllers/GymTrainerController";
import { TrainerProfileController } from "./presentation/controllers/TrainerProfileController";
import { createTrainersRouter } from "./presentation/routes/trainers.routes";

import { IGymRepository } from "../gyms/domain/repositories/IGymRepository";
import { IClientRepository } from "../clients/domain/repositories/IClientRepository";
import { IS3Service } from "../../shared/services/IS3Service";
import { ISendWelcomeEmailUseCase } from "../auth/application/interfaces/ISendWelcomeEmailUseCase";
import { IGetClientByIdUseCase } from "../clients/application/interfaces/IGetClientByIdUseCase";

export interface TrainersModuleDependencies {
    gymRepository: IGymRepository;
    clientRepository: IClientRepository;
    s3Service: IS3Service;
    sendWelcomeEmailUseCase: ISendWelcomeEmailUseCase;
    getClientByIdUseCase: IGetClientByIdUseCase;
    trainerRepository?: TrainerRepository;
}

export function initTrainersModule(deps: TrainersModuleDependencies) {
    const trainerRepository = deps.trainerRepository ?? new TrainerRepository();

    const addTrainerUseCase = new AddTrainerUseCase(trainerRepository, deps.s3Service);
    const getTrainersUseCase = new GetTrainersUseCase(trainerRepository);
    const getTrainerByIdUseCase = new GetTrainerByIdUseCase(trainerRepository);
    const updateTrainerUseCase = new UpdateTrainerUseCase(trainerRepository, deps.s3Service);
    const deleteTrainerUseCase = new DeleteTrainerUseCase(trainerRepository);

    const getTrainerProfileUseCase = new GetTrainerProfileUseCase(trainerRepository);
    const updateTrainerProfileUseCase = new UpdateTrainerProfileUseCase(trainerRepository);
    const updateTrainerProfileImageUseCase = new UpdateTrainerProfileImageUseCase(trainerRepository, deps.s3Service);
    const getTrainerGymDetailsUseCase = new GetTrainerGymDetailsUseCase(trainerRepository, deps.gymRepository);
    const getAssignedClientsUseCase = new GetAssignedClientsUseCase(deps.clientRepository);

    const gymTrainerController = new GymTrainerController(
        addTrainerUseCase,
        getTrainersUseCase,
        getTrainerByIdUseCase,
        updateTrainerUseCase,
        deleteTrainerUseCase,
        deps.sendWelcomeEmailUseCase
    );

    const trainerProfileController = new TrainerProfileController(
        getTrainerProfileUseCase,
        updateTrainerProfileUseCase,
        updateTrainerProfileImageUseCase,
        getTrainerGymDetailsUseCase,
        getAssignedClientsUseCase,
        deps.getClientByIdUseCase
    );

    const router = createTrainersRouter({
        gymTrainerController,
        trainerProfileController,
    });

    return {
        router,
        repositories: {
            trainerRepository,
        },
        controllers: {
            gymTrainerController,
            trainerProfileController,
        },
        useCases: {
            addTrainerUseCase,
            getTrainersUseCase,
            getTrainerByIdUseCase,
            updateTrainerUseCase,
            deleteTrainerUseCase,
            getTrainerProfileUseCase,
            updateTrainerProfileUseCase,
            updateTrainerProfileImageUseCase,
            getTrainerGymDetailsUseCase,
            getAssignedClientsUseCase,
        },
    };
}
