import { Response, NextFunction } from "express";
import { IWorkoutLibraryUseCase } from "../../../application/IUseCases/workout-library/IWorkoutLibraryUseCase";
import { ResponseStatus, HttpStatus } from "../../../constants/statusCodes.constants";
import { AuthRequest } from "../../middlewares/protect";
import { ROLES } from "../../../constants/roles.constants";
import { ResponseMessage } from "../../../constants/response.constants";


export class WorkoutLibraryController {
    constructor(
        private _workoutLibraryUseCase: IWorkoutLibraryUseCase,
    ) { }

    async createExercise(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {

            const data = { ...req.body};
            const result = await this._workoutLibraryUseCase.createExercise(data);
            res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.EXERCISE_CREATE_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async updateExercise(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {            
          
            const data = { ...req.body, id: req.params.id,  };
            const result = await this._workoutLibraryUseCase.updateExercise(data);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.EXERCISE_UPDATE_SUCCESS,
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
                message: ResponseMessage.EXERCISE_DELETE_SUCCESS
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
                    message: ResponseMessage.EXERCISE_FETCH_SUCCESS,
                    data: result
                });
                return;
            }

        } catch (error) {
            next(error);
        }
    }
}
