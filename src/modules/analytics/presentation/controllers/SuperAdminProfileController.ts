import { IGetSuperAdminProfileUseCase } from "../../application/interfaces/IGetSuperAdminProfileUseCase";
import { IUpdateSuperAdminProfileUseCase } from "../../application/interfaces/IUpdateSuperAdminProfileUseCase";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../../shared/middleware/protect";
import { HttpStatus } from "../../../../shared/constants/statusCodes.constants";
import { ResponseStatus } from "../../../../shared/constants/statusCodes.constants";
import { IUpdateSuperAdminLogoUseCase } from "../../application/interfaces/IUpdateSuperAdminLogoUseCase";
import { ResponseMessage } from "../../../../shared/constants/response.constants";
import { BadRequestError } from "../../../../shared/errors/AppError";


export class SuperAdminProfileController {
    constructor(
        private _getSuperAdminProfileUseCase: IGetSuperAdminProfileUseCase,
        private _updateSuperAdminProfileUseCase: IUpdateSuperAdminProfileUseCase,
        private _updateSuperAdminLogoUseCase: IUpdateSuperAdminLogoUseCase,
    ) { }

    async getSuperAdminProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const superAdminId = req.user!.id;
            const profile = await this._getSuperAdminProfileUseCase.execute(superAdminId);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_RETRIVE_SUCCESS,
                data: { ...profile }
            })
        } catch (error) {
            next(error);
        }
    }

    async updateSuperAdminProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const superAdminId = req.user!.id;
            const profile = req.body;
            await this._updateSuperAdminProfileUseCase.execute(superAdminId, profile);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_UPDATE_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }

    async updateSuperAdminLogo(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            if (!req.file) {
                throw new BadRequestError("File required")
            }
            const newLogoUrl = await this._updateSuperAdminLogoUseCase.execute(userId, req.file);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.LOGO_UPDATE_SUCCESS,
                data: { newLogoUrl }
            })
        } catch (error) {
            next(error)
        }
    }

}