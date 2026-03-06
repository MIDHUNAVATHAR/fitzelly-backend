import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";

import { IGetClientProfileWithMembershipUseCase } from "../../../application/IUseCases/client-profile/IGetClientProfileWithMembershipUseCase";
import { IUpdateClientProfileUseCase } from "../../../application/IUseCases/client-profile/IUpdateClientProfileUseCase";
import { IUpdateClientProfileImageUseCase } from "../../../application/IUseCases/client-profile/IUploadClientProfileImageUseCase";
import { IGetClientGymDetailsUseCase } from "../../../application/IUseCases/client-profile/IGetClientGymDetailsUseCase";

export class ClientProfileController {
    constructor(
        private _getClientProfileWithMembershipUseCase: IGetClientProfileWithMembershipUseCase,
        private _updateClientProfileUseCase: IUpdateClientProfileUseCase,
        private _updateClientProfileImageUseCase: IUpdateClientProfileImageUseCase,
        private _getClientGymDetailsUseCase: IGetClientGymDetailsUseCase
    ) { }

    async getClientProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientId = req.user!.id;
            const profileAndMembership = await this._getClientProfileWithMembershipUseCase.execute(clientId);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_RETRIVE_SUCCESS,
                data: profileAndMembership
            });
        } catch (error) {
            next(error);
        }
    }

    async getClientGymDetails(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientId = req.user!.id;
            const gymProfile = await this._getClientGymDetailsUseCase.execute(clientId);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_RETRIVE_SUCCESS,
                data: gymProfile
            });
        } catch (error) {
            next(error);
        }
    }

    async updateClientProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientId = req.user!.id;
            const updatedProfile = await this._updateClientProfileUseCase.execute(clientId, req.body);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_UPDATE_SUCCESS,
                data: { ...updatedProfile }
            });
        } catch (error) {
            next(error);
        }
    }

    async uploadClientProfileImage(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const clientId = req.user!.id;
            if (!req.file) {
                throw Error("File required");
            }

            const updatedProfile = await this._updateClientProfileImageUseCase.execute(clientId, req.file as Express.Multer.File);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.LOGO_UPDATE_SUCCESS,
                data: { profileImage: updatedProfile.profileUrl }
            });

        } catch (error) {
            next(error);
        }
    }

}
