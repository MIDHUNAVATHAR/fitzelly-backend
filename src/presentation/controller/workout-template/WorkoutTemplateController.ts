import { Response, NextFunction } from "express";
import { IWorkoutTemplateUseCase } from "../../../application/IUseCases/workout-template/IWorkoutTemplateUseCase";
import { ResponseStatus, HttpStatus } from "../../../constants/statusCodes.constants";
import { AuthRequest } from "../../middlewares/protect";
import { ROLES } from "../../../constants/roles.constants";

export class WorkoutTemplateController {
    constructor(private readonly _workoutTemplateUseCase: IWorkoutTemplateUseCase) { }

    async createTemplate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const isGym = req.user?.role === ROLES.GYM;
            const trainerId = isGym ? undefined : req.user?.id;
            const gymId = isGym ? req.user?.id : req.user?.gymId;
            const data = { ...req.body, trainerId, gymId };
            const result = await this._workoutTemplateUseCase.createTemplate(data);
            res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: "Workout template created successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getTemplates(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const isGym = req.user?.role === ROLES.GYM;
            const trainerId = isGym ? undefined : req.user?.id;
            const gymId = (req.query.gymId as string) || (isGym ? req.user?.id : req.user?.gymId);
            
            let result;
            if (trainerId) {
                result = await this._workoutTemplateUseCase.getTemplatesByTrainerId(trainerId);
            } else if (gymId) {
                result = await this._workoutTemplateUseCase.getTemplatesByGymId(gymId as string);
            } else {
                throw new Error("Trainer ID or Gym ID is required");
            }

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteTemplate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            await this._workoutTemplateUseCase.deleteTemplate(id);
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Workout template deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    async assignTemplate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { templateId, clientId, weekStartDate, notes } = req.body;
            const isGym = req.user?.role === ROLES.GYM;
            const trainerId = isGym ? (req.body.trainerId || "") : (req.user?.id as string);
            const gymId = isGym ? (req.user?.id as string) : (req.user?.gymId as string);

            const result = await this._workoutTemplateUseCase.assignTemplateToClient(
                templateId, 
                clientId, 
                trainerId, 
                gymId, 
                new Date(weekStartDate), 
                notes
            );
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Workout plan assigned from template successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}
