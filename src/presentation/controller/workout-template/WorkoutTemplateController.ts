import { Response, NextFunction } from "express";
import { IWorkoutTemplateUseCase } from "../../../application/IUseCases/workout-template/IWorkoutTemplateUseCase";
import { ResponseStatus, HttpStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";
import { AuthRequest } from "../../middlewares/protect";

export class WorkoutTemplateController {
    constructor(private _workoutTemplateUseCase: IWorkoutTemplateUseCase) { }

    async createTemplate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const trainerId = req.user?.id;
            const gymId = req.user?.gymId;
            const data = { ...req.body, trainerId, gymId };
            const result = await this._workoutTemplateUseCase.createTemplate(data);

            res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.WORKOUT_TEMPLATE_CREATE_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getTemplates(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const trainerId = req.user?.id;
            if (!trainerId) {
                throw new Error("Trainer ID is required");
            }
            const result = await this._workoutTemplateUseCase.getTemplatesByTrainerId(trainerId);

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
                message: ResponseMessage.WORKOUT_TEMPLATE_DELETE_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }

    async assignTemplate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { templateId, clientId, weekStartDate, notes } = req.body;
            const trainerId = req.user?.id as string;
            const gymId = req.user?.gymId as string;

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
                message: ResponseMessage.WORKOUT_TEMPLATE_ASSIGN_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}
