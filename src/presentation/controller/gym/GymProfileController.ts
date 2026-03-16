import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { IGetGymProfileUseCase } from "../../../application/IUseCases/gym-profile/IGetGymProfileUseCase";
import { IUpdateGymProfileUseCase } from "../../../application/IUseCases/gym-profile/IUpdateGymProfileUseCase";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { IUpdateGymLogoUseCase } from "../../../application/IUseCases/gym-profile/IUpdateGymLogoUseCase";
import { IS3Service } from "../../../domain/services/IS3Service";
import { ResponseMessage } from "../../../constants/response.constants";

export class GymProfileController {
    constructor(
        private _getGymProfileUseCase: IGetGymProfileUseCase,
        private _updateGymProfileUseCase: IUpdateGymProfileUseCase,
        private _updateGymLogoUseCase: IUpdateGymLogoUseCase,
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
}