import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/protect";
import { IGetGymProfileUseCase } from "../../application/IUseCases/IGetGymProfileUseCase";
import { IUpdateGymProfileUseCase } from "../../application/IUseCases/IUpdateGymProfileUseCase";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { IUpdateGymLogoUseCase } from "../../application/IUseCases/IUpdateGymLogoUseCase";

export class GymProfileController {
    constructor(
        private _getGymProfileUseCase: IGetGymProfileUseCase,
        private _updateGymProfileUseCase: IUpdateGymProfileUseCase,
        private _updateGymLogoUseCase: IUpdateGymLogoUseCase,
        private _s3Service: any
    ) { }

    async getGymProfile(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const profile = await this._getGymProfileUseCase.execute(gymId);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "gym profile successfully fetched",
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
                message: "gym profile update successfull",
                data: { ...updatedProfile }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateGymLogo(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const logoUrl = await this._s3Service.uploadFile(req.file);

            const updatedProfile = await this._updateGymLogoUseCase.execute(userId, logoUrl);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "gym logo update successfull",
                data: { ...updatedProfile }
            })
        } catch (error) {
            next(error);
        }
    }
}