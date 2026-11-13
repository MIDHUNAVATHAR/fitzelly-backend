import { ExerciseRepository } from "./infrastructure/repositories/ExerciseRepository";
import { WorkoutTemplateRepository } from "./infrastructure/repositories/WorkoutTemplateRepository";
import { WorkoutPlanRepository } from "./infrastructure/repositories/WorkoutPlanRepository";
import { WorkoutLogRepository } from "./infrastructure/repositories/WorkoutLogRepository";

import { WorkoutLibraryUseCase } from "./application/use-cases/WorkoutLibraryUseCase";
import { WorkoutTemplateUseCase } from "./application/use-cases/WorkoutTemplateUseCase";
import { CreateOrUpdateWorkoutPlanUseCase } from "./application/use-cases/CreateOrUpdateWorkoutPlanUseCase";
import { GetWorkoutPlanByClientIdUseCase } from "./application/use-cases/GetWorkoutPlanByClientIdUseCase";
import { TrackWorkoutProgressUseCase } from "./application/use-cases/TrackWorkoutProgressUseCase";
import { GetWorkoutProgressUseCase } from "./application/use-cases/GetWorkoutProgressUseCase";
import { GetWorkoutStreakUseCase } from "./application/use-cases/GetWorkoutStreakUseCase";

import { WorkoutLibraryController } from "./presentation/controllers/WorkoutLibraryController";
import { WorkoutTemplateController } from "./presentation/controllers/WorkoutTemplateController";
import { TrainerWorkoutPlanController } from "./presentation/controllers/TrainerWorkoutPlanController";
import { ClientWorkoutPlanController } from "./presentation/controllers/ClientWorkoutPlanController";
import { createWorkoutsRouter } from "./presentation/routes/workouts.routes";

import { ITrainerRepository } from "../trainers/domain/repositories/ITrainerRepository";

export interface WorkoutsModuleDependencies {
    trainerRepository: ITrainerRepository;
    exerciseRepository?: ExerciseRepository;
    workoutTemplateRepository?: WorkoutTemplateRepository;
    workoutPlanRepository?: WorkoutPlanRepository;
    workoutLogRepository?: WorkoutLogRepository;
}

export function initWorkoutsModule(deps: WorkoutsModuleDependencies) {
    const exerciseRepository = deps.exerciseRepository ?? new ExerciseRepository();
    const workoutTemplateRepository = deps.workoutTemplateRepository ?? new WorkoutTemplateRepository();
    const workoutPlanRepository = deps.workoutPlanRepository ?? new WorkoutPlanRepository();
    const workoutLogRepository = deps.workoutLogRepository ?? new WorkoutLogRepository();

    const workoutLibraryUseCase = new WorkoutLibraryUseCase(exerciseRepository);
    const workoutTemplateUseCase = new WorkoutTemplateUseCase(workoutTemplateRepository, exerciseRepository, workoutPlanRepository);
    const createOrUpdateWorkoutPlanUseCase = new CreateOrUpdateWorkoutPlanUseCase(workoutPlanRepository);
    const getWorkoutPlanByClientIdUseCase = new GetWorkoutPlanByClientIdUseCase(workoutPlanRepository, deps.trainerRepository);
    const trackWorkoutProgressUseCase = new TrackWorkoutProgressUseCase(workoutLogRepository);
    const getWorkoutProgressUseCase = new GetWorkoutProgressUseCase(workoutLogRepository);
    const getWorkoutStreakUseCase = new GetWorkoutStreakUseCase(workoutLogRepository);

    const workoutLibraryController = new WorkoutLibraryController(workoutLibraryUseCase);
    const workoutTemplateController = new WorkoutTemplateController(workoutTemplateUseCase);
    const trainerWorkoutPlanController = new TrainerWorkoutPlanController(createOrUpdateWorkoutPlanUseCase, getWorkoutPlanByClientIdUseCase);
    const clientWorkoutPlanController = new ClientWorkoutPlanController(
        getWorkoutPlanByClientIdUseCase,
        trackWorkoutProgressUseCase,
        getWorkoutProgressUseCase,
        getWorkoutStreakUseCase
    );

    const router = createWorkoutsRouter({
        workoutLibraryController,
        workoutTemplateController,
        trainerWorkoutPlanController,
        clientWorkoutPlanController,
    });

    return {
        router,
        repositories: {
            exerciseRepository,
            workoutTemplateRepository,
            workoutPlanRepository,
            workoutLogRepository,
        },
        controllers: {
            workoutLibraryController,
            workoutTemplateController,
            trainerWorkoutPlanController,
            clientWorkoutPlanController,
        },
        useCases: {
            workoutLibraryUseCase,
            workoutTemplateUseCase,
            createOrUpdateWorkoutPlanUseCase,
            getWorkoutPlanByClientIdUseCase,
            trackWorkoutProgressUseCase,
            getWorkoutProgressUseCase,
            getWorkoutStreakUseCase,
        },
    };
}
