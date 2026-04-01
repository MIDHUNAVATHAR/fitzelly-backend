import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { IGetGymProfileUseCase } from "../../../application/IUseCases/gym-profile/IGetGymProfileUseCase";
import { IUpdateGymProfileUseCase } from "../../../application/IUseCases/gym-profile/IUpdateGymProfileUseCase";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { IUpdateGymLogoUseCase } from "../../../application/IUseCases/gym-profile/IUpdateGymLogoUseCase";
import { IUploadGymCertificateUseCase } from "../../../application/IUseCases/gym-profile/IUploadGymCertificateUseCase";
import { IDeleteGymCertificateUseCase } from "../../../application/IUseCases/gym-profile/IDeleteGymCertificateUseCase";
import { IReApplyGymUseCase } from "../../../application/IUseCases/gym-profile/IReApplyGymUseCase";
import { ResponseMessage } from "../../../constants/response.constants";

export class GymProfileController {
    constructor(
        private _getGymProfileUseCase: IGetGymProfileUseCase,
        private _updateGymProfileUseCase: IUpdateGymProfileUseCase,
        private _updateGymLogoUseCase: IUpdateGymLogoUseCase,
        private _uploadGymCertificateUseCase: IUploadGymCertificateUseCase,
        private _deleteGymCertificateUseCase: IDeleteGymCertificateUseCase,
        private _reApplyGymUseCase: IReApplyGymUseCase,
    ) { }

    async getGymProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const profile = await this._getGymProfileUseCase.execute(gymId);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_RETRIVE_SUCCESS,
                data: { ...profile }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateGymProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id   //protect middleware ensure req.user 
            const updatedProfile = await this._updateGymProfileUseCase.execute(gymId, req.body);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_UPDATE_SUCCESS,
                data: { ...updatedProfile }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateGymLogo(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            if (!req.file) {
                throw Error("File required");
            }

            const updatedProfile = await this._updateGymLogoUseCase.execute(userId, req.file);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.LOGO_UPDATE_SUCCESS,
                data: { ...updatedProfile }
            })
        } catch (error) {
            next(error);
        }
    }

    async uploadCertificate(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const certificateName = req.body.name;
            if (!req.file) {
                throw new Error("File required");
            }
            if (!certificateName) {
                throw new Error("Certificate name required");
            }

            const updatedGym = await this._uploadGymCertificateUseCase.execute(gymId, req.file, certificateName);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Certificate uploaded successfully",
                data: updatedGym
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCertificate(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const certificateKey = req.body.key; // Received key from body

            const updatedGym = await this._deleteGymCertificateUseCase.execute(gymId, certificateKey);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Certificate deleted successfully",
                data: updatedGym
            });
        } catch (error) {
            next(error);
        }
    }

    async reApply(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const updatedGym = await this._reApplyGymUseCase.execute(gymId);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Re-application submitted successfully",
                data: updatedGym
            });
        } catch (error) {
            next(error);
        }
    }
}