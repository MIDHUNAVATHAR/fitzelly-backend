import { IGetSuperAdminProfileUseCase } from "../../application/IUseCases/IGetSuperAdminProfileUseCase";
import { IUpdateSuperAdminProfileUseCase } from "../../application/IUseCases/IUpdateSuperAdminProfileUseCase";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/protect";
import { HttpStatus } from "../../constants/statusCodes.constants";
import { ResponseStatus } from "../../constants/statusCodes.constants";
import { IUpdateSuperAdminLogoUseCase } from "../../application/IUseCases/IUpdateSuperAdminLogoUseCase";


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
                message: "super admin profile successfully fetched",
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
                message: "profile update successfull"
            })
        } catch (error) {
            next(error)
        }
    }

    async updateSuperAdminLogo(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            if (!req.file) {
                throw new Error("File required")
            }
            const newLogoUrl = await this._updateSuperAdminLogoUseCase.execute(userId, req.file);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "gym logo update successfull",
                data: { newLogoUrl }
            })
        } catch (error) {
            next(error)
        }
    }

}