import { IAddTrainerUseCase } from "../../../application/IUseCases/gym-trainer/IAddTrainerUseCase";
import { IGetTrainersUseCase } from "../../../application/IUseCases/gym-trainer/IGetTrainersUseCase";
import { IGetTrainerByIdUseCase } from "../../../application/IUseCases/gym-trainer/IGetTrainerByIdUseCase";
import { IUpdateTrainerUseCase } from "../../../application/IUseCases/gym-trainer/IUpdateTrainerUseCase";
import { IDeleteTrainerUseCase } from "../../../application/IUseCases/gym-trainer/IDeleteTrainerUseCase";
import { ISendWelcomeEmailUseCase } from "../../../application/IUseCases/invite/ISendWelcomeEmailUseCase";
import { ResponseMessage } from "../../../constants/response.constants";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { AuthRequest } from "../../middlewares/protect";
import { Response, NextFunction } from "express";

import { IS3UploadFile } from "../../../domain/services/IS3Service";
export class GymTrainerController {
    constructor(
        private _addTrainerUseCase: IAddTrainerUseCase,
        private _getTrainersUseCase: IGetTrainersUseCase,
        private _getTrainerByIdUseCase: IGetTrainerByIdUseCase,
        private _updateTrainerUseCase: IUpdateTrainerUseCase,
        private _deleteTrainerUseCase: IDeleteTrainerUseCase,
        private _sendWelcomeEmailUseCase: ISendWelcomeEmailUseCase
    ) { }

    async addTrainer(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {

                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                })

            }
            const gymId = user.id;
            const { fullName, email, phoneNumber, salary, specialization, dateOfBirth, qualification, address } = req.body;

            let certificateFiles: IS3UploadFile[] = [];
            if (req.files && Array.isArray(req.files)) {
                certificateFiles = req.files as unknown as IS3UploadFile[];
            }

            await this._addTrainerUseCase.execute({
                gymId, fullName, email, phoneNumber, salary, specialization, dateOfBirth, qualification, address, certificateFiles
            })

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_ADD_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }

    async getTrainers(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {

                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                })

            }
            const gymId = user.id;

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const search = (req.query.search as string) || ""

            const result = await this._getTrainersUseCase.execute(gymId, page, limit, search);

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

    async getTrainerById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {

                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                })

            }
            const gymId = user.id;

            const trainerId = req.params.id as string;
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

    async updateTrainer(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {

                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                })

            }
            const gymId = user.id;
            const trainerId = req.params.id as string;
            const { fullName, phoneNumber, salary, specialization, dateOfBirth, email, qualification, address } = req.body;

            // Handle certificates
            let existingCertificates: string[] = [];
            try {
                if (req.body.certificates) {
                    existingCertificates = JSON.parse(req.body.certificates);
                }
            } catch {
                if (Array.isArray(req.body.certificates)) {
                    existingCertificates = req.body.certificates;
                }
            }

            let newCertificateFiles: IS3UploadFile[] = [];
            if (req.files && Array.isArray(req.files)) {
                newCertificateFiles = req.files as unknown as IS3UploadFile[];
            }

            const updatedTrainer = await this._updateTrainerUseCase.execute(trainerId, gymId, {
                fullName, email, phoneNumber, salary, specialization, dateOfBirth, qualification, address, certificates: existingCertificates, newCertificateFiles
            })

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TRAINER_UPDATE_SUCCESS,
                data: updatedTrainer
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteTrainer(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {

                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                })

            }
            const gymId = user.id;
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

    async sendWelcomeEmail(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {

                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: ResponseMessage.ACCESS_TOKEN_MISSING
                })

            }
            const gymId = user.id;


            const trainerId = req.params.id as string;


            await this._sendWelcomeEmailUseCase.execute({ userId: trainerId, gymId, role: "trainer" });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.WELCOME_MAIL_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }
}