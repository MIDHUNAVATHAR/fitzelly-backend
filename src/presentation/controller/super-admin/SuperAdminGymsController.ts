import { Request, Response, NextFunction } from "express";
import { IGetAllGymsUseCase } from "../../../application/IUseCases/superAd-gym-listing/IGetAllGymsUseCase";
import { IGetGymByIdUseCase } from "../../../application/IUseCases/gym-profile/IGetGymByIdUseCase";
import { IUpdateGymStatusUseCase } from "../../../application/IUseCases/superAd-gym-listing/IUpdateGymStatusUseCase";
import { IApproveGymUseCase } from "../../../application/IUseCases/superAd-gym-listing/IApproveGymUseCase";
import { ResponseStatus, HttpStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";

export class SuperAdminGymsController {
    constructor(
        private readonly _getAllGymsUseCase: IGetAllGymsUseCase,
        private readonly _getGymByIdUseCase: IGetGymByIdUseCase,
        private readonly _updateGymStatusUseCase: IUpdateGymStatusUseCase,
        private readonly _approveGymUseCase: IApproveGymUseCase,
    ) { }

    async getAllGyms(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const search = (req.query.search as string) || "";

            const result = await this._getAllGymsUseCase.execute(page, limit, search);

            res.status(HttpStatus.OK).json({
                success: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYMS_FETCH_SUCCESS,
                data: result
            })

        } catch (error) {
            next(error)
        }
    }

    async getGymById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.params.gymId as string;
            const gym = await this._getGymByIdUseCase.execute(gymId);

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYM_FETCH_SUCCESS,
                data: gym
            })
        } catch (error) {
            next(error)
        }
    }

    async updateGymStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.params.gymId as string;
            const { approvalStatus } = req.body;
            const updatedGym = await this._updateGymStatusUseCase.execute(gymId, { approvalStatus } as any)

            res.status(HttpStatus.OK).json({
                success: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYM_UPDATE_SUCCESS,
                data: updatedGym
            })
        } catch (error) {
            next(error)
        }
    }

    async approveGym(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gymId = req.params.gymId as string;
            const updatedGym = await this._approveGymUseCase.execute(gymId);

            res.status(HttpStatus.OK).json({
                success: ResponseStatus.SUCCESS,
                message: ResponseMessage.GYM_UPDATE_SUCCESS,
                data: updatedGym
            })
        } catch (error) {
            next(error)
        }
    }
}