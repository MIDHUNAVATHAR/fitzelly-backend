import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { IAddEnquiryUseCase, IGetEnquiriesUseCase, IUpdateEnquiryUseCase, IDeleteEnquiryUseCase } from "../../../application/IUseCases/enquiry/IEnquiryUseCases";
import { ResponseMessage } from "../../../constants/response.constants";

export class EnquiryController {
    constructor(
        private _addEnquiryUseCase: IAddEnquiryUseCase,
        private _getEnquiriesUseCase: IGetEnquiriesUseCase,
        private _updateEnquiryUseCase: IUpdateEnquiryUseCase,
        private _deleteEnquiryUseCase: IDeleteEnquiryUseCase
    ) { }

    async addEnquiry(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const result = await this._addEnquiryUseCase.execute(gymId, req.body);
            return res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.ENQUIRY_ADD_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getEnquiries(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const { page = 1, limit = 10, search, startDate, endDate } = req.query;

            const result = await this._getEnquiriesUseCase.execute(
                gymId,
                Number(page),
                Number(limit),
                search as string,
                startDate ? new Date(startDate as string) : undefined,
                endDate ? new Date(endDate as string) : undefined
            );

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.ENQUIRIES_FETCH_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async updateEnquiry(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const result = await this._updateEnquiryUseCase.execute(id, req.body);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.ENQUIRY_UPDATE_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteEnquiry(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await this._deleteEnquiryUseCase.execute(id);
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.ENQUIRY_DELETE_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }
}
