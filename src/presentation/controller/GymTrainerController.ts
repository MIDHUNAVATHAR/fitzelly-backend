import { IAddTrainerUseCase } from "../../application/IUseCases/trainer/IAddTrainerUseCase";
import { IGetTrainersUseCase } from "../../application/IUseCases/trainer/IGetTrainersUseCase";
import { IGetTrainerByIdUseCase } from "../../application/IUseCases/trainer/IGetTrainerByIdUseCase";
import { IUpdateTrainerUseCase } from "../../application/IUseCases/trainer/IUpdateTrainerUseCase";
import { IDeleteTrainerUseCase } from "../../application/IUseCases/trainer/IDeleteTrainerUseCase";
import { ISendWelcomeEmailUseCase } from "../../application/IUseCases/invite/ISendWelcomeEmailUseCase";
import { ResponseMessage } from "../../constants/response.constants";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { AuthRequest } from "../middlewares/protect";
import { Response, NextFunction } from "express";
import { ConflictError, NotFoundError } from "../../application/errors/AppError";


export class GymTrainerController {
    constructor(
        private _addTrainerUseCase: IAddTrainerUseCase,
        private _getTrainersUseCase: IGetTrainersUseCase,
        private _getTrainerByIdUseCase: IGetTrainerByIdUseCase,
        private _updateTrainerUseCase: IUpdateTrainerUseCase,
        private _deleteTrainerUseCase: IDeleteTrainerUseCase,
        private _sendWelcomeEmailUseCase: ISendWelcomeEmailUseCase
    ) { }

    async addTrainer(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.user?.id!;
            const { fullName, email, phoneNumber, salary, specialization, dateOfBirth } = req.body;
            await this._addTrainerUseCase.execute({
                gymId, fullName, email, phoneNumber, salary, specialization, dateOfBirth
            })

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_ADD_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }

    async getTrainers(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.user?.id!;
            const page = Number(req.query.page) || 1;
            const search = (req.query.search as string) || ""

            const result = await this._getTrainersUseCase.execute(gymId, page, search);

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.GET_TRAINERS_SUCCESS,
                data: {
                    trainers: result.trainers,
                    pagination: { total: result.total, page: result.page, limit: result.limit }
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getTrainerById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const trainerId = req.params.id as string;
            const gymId = req.user?.id!;
            const trainer = await this._getTrainerByIdUseCase.execute(trainerId, gymId);

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.GET_TRAINER_SUCCESS,
                data: trainer
            })
        } catch (error) {
            next(error)
        }
    }

    async updateTrainer(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.user?.id!;
            const trainerId = req.params.id as string;
            const { fullName, phoneNumber, salary, specialization, dateOfBirth, email } = req.body;

            const updatedTrainer = await this._updateTrainerUseCase.execute(trainerId, gymId, { fullName, email, phoneNumber, salary, specialization, dateOfBirth })

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_UPDATE_SUCCESS,
                data: updatedTrainer
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteTrainer(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.user?.id!;
            const trainerId = req.params.id as string;

            await this._deleteTrainerUseCase.execute(trainerId, gymId);

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_DELETE_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }

    async sendWelcomeEmail(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const trainerId = req.params.id as string;
            const gymId = req.user?.id!;
          
            const trainer = await this._getTrainerByIdUseCase.execute(trainerId, gymId);

            if (trainer.isEmailVerified) {
                return next(new ConflictError("Already verified"))
            }

            if (!trainer) {
                throw new NotFoundError("Trainer not found")
            }

            const frontendUrl = process.env.FRONTEND_URL;
            const urlPrefix = `${frontendUrl}/create-password?type=trainer&id=${trainer.id}`;

            await this._sendWelcomeEmailUseCase.execute(trainer.id, trainer.email, trainer.fullName, gymId, urlPrefix);

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.WELCOME_MAIL_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }
}