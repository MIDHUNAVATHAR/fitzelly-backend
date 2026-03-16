import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";

import { IGetTrainerProfileUseCase } from "../../../application/IUseCases/trainer-profile/IGetTrainerProfileUseCase";
import { IUpdateTrainerProfileUseCase } from "../../../application/IUseCases/trainer-profile/IUpdateTrainerProfileUseCase";
import { IUploadTrainerProfileImageUseCase } from "../../../application/IUseCases/trainer-profile/IUploadTrainerProfileImageUseCase";
import { IGetTrainerGymDetailsUseCase } from "../../../application/IUseCases/trainer-profile/IGetTrainerGymDetailsUseCase";
import { IGetAssignedClientsUseCase } from "../../../application/IUseCases/trainer-assinged-clients/IGetAssignedClientsUseCase";
import { IGetClientByIdUseCase } from "../../../application/IUseCases/gym-client/IGetClientByIdUseCase";
import { UpdateTrainerProfileDTO } from "../../../application/dtos/trainer-profile/UpdateTrainerProfileDTO";



export class TrainerProfileController {
    constructor(
        private _getTrainerProfileUseCase: IGetTrainerProfileUseCase,
        private _updateTrainerProfileUseCase: IUpdateTrainerProfileUseCase,
        private _uploadTrainerProfileImageUseCase: IUploadTrainerProfileImageUseCase,
        private _getTrainerGymDetailsUseCase: IGetTrainerGymDetailsUseCase,
        private _getAssignedClientsUseCase: IGetAssignedClientsUseCase,
        private _getClientByIdUseCase: IGetClientByIdUseCase
    ) { }

    async getTrainerProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const trainerId = req.user!.id;
            const profile = await this._getTrainerProfileUseCase.execute(trainerId);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_RETRIVE_SUCCESS,
                data: profile
            });
        } catch (error) {
            next(error);
        }
    }

    async updateTrainerProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const trainerId = req.user!.id;
            const data: UpdateTrainerProfileDTO = {
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                specialization: req.body.specialization,
                dateOfBirth: req.body.dateOfBirth,
                qualification: req.body.qualification,
                address: req.body.address,
                profilePhoto: req.file as Express.Multer.File | undefined
            };

            const updatedProfile = await this._updateTrainerProfileUseCase.execute(trainerId, data);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_UPDATE_SUCCESS,
                data: updatedProfile
            });
        } catch (error) {
            next(error);
        }
    }

    async uploadTrainerProfileImage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const trainerId = req.user!.id;
            const file = req.file;

            if (!file) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: ResponseStatus.FAIL,
                    message: "No image file provided"
                });
            }

            const updatedProfile = await this._uploadTrainerProfileImageUseCase.execute(trainerId, file);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Profile image updated successfully",
                data: updatedProfile
            });

        } catch (error) {
            next(error);
        }
    }

    async getTrainerGymDetails(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const trainerId = req.user!.id;
            const gymDetails = await this._getTrainerGymDetailsUseCase.execute(trainerId);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_RETRIVE_SUCCESS,
                data: gymDetails
            });
        } catch (error) {
            next(error);
        }
    }

    async getAssignedClients(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const trainerId = req.user!.id;
            const page = Number(req.query.page) || 1;
            const search = (req.query.search as string) || "";

            const result = await this._getAssignedClientsUseCase.execute(trainerId, page, search);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.GET_CLIENTS_SUCCESS,
                data: {
                    clients: result.clients, pagination:
                        { total: result.total, page: result.page, limit: result.limit }
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getAssignedClientById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientId = req.params.id as string;


            const client = await this._getClientByIdUseCase.execute(clientId);

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.GET_CLIENT_SUCCESS,
                data: { ...client }
            })
        } catch (error) {
            next(error);
        }
    }
}
