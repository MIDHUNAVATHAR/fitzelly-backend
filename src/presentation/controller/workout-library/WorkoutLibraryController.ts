import { Response, NextFunction } from "express";
import { IWorkoutLibraryUseCase } from "../../../application/IUseCases/workout-library/IWorkoutLibraryUseCase";
import { ResponseStatus, HttpStatus } from "../../../constants/statusCodes.constants";
import { AuthRequest } from "../../middlewares/protect";
import { ROLES } from "../../../constants/roles.constants";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";

export class WorkoutLibraryController {
    constructor(
        private readonly _workoutLibraryUseCase: IWorkoutLibraryUseCase,
        private readonly _trainerRepository: ITrainerRepository
    ) { }

    async createExercise(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            let gymId = req.user?.role === ROLES.GYM ? req.user.id : req.user?.gymId;
            
            // Fallback for trainers if gymId is missing in token
            if (!gymId && req.user?.role === ROLES.TRAINER) {
                const trainer = await this._trainerRepository.findById(req.user.id);
                gymId = trainer?.gymId;
            }

            // Super admin doesn't have/need gymId (they create global exercises)
            if (!gymId && req.user?.role !== ROLES.SUPERADMIN) {
                throw new Error("Gym ID is required. Please logout and login again.");
            }
            
            const data = { ...req.body, gymId };
            const result = await this._workoutLibraryUseCase.createExercise(data);
            res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: "Exercise created successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async updateExercise(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            let gymId = req.user?.role === ROLES.GYM ? req.user.id : req.user?.gymId;
            
            // Fallback for trainers if gymId is missing in token
            if (!gymId && req.user?.role === ROLES.TRAINER) {
                const trainer = await this._trainerRepository.findById(req.user.id);
                gymId = trainer?.gymId;
            }

            if (!gymId && req.user?.role !== ROLES.SUPERADMIN) throw new Error("Gym ID is required. Please logout and login again.");
            
            const data = { ...req.body, id: req.params.id, gymId };
            const result = await this._workoutLibraryUseCase.updateExercise(data);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Exercise updated successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteExercise(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            await this._workoutLibraryUseCase.deleteExercise(id);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Exercise deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    async getExercises(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            // If super admin or trainer, fetch global exercises
            if (req.user?.role === ROLES.SUPERADMIN || req.user?.role === ROLES.TRAINER) {
                const result = await this._workoutLibraryUseCase.getGlobalExercises();
                res.status(HttpStatus.OK).json({
                    status: ResponseStatus.SUCCESS,
                    data: result
                });
                return;
            }

            // Otherwise fetch by gymId (support for GYM role)
            const gymId = (req.params.gymId as string) || (req.user?.role === ROLES.GYM ? req.user.id : req.user?.gymId);
            
            if (!gymId) {
                throw new Error("Gym ID is required. Please logout and login again.");
            }
            
            const result = await this._workoutLibraryUseCase.getExercisesByGymId(gymId as string);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}
