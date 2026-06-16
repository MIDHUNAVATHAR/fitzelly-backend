import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { IAddMembershipUseCase, IGetMembershipsUseCase, IGetMembershipByIdUseCase, IUpdateMembershipUseCase, 
    IDeleteMembershipUseCase, IAddPaymentUseCase, IUpdatePaymentUseCase, IDeletePaymentUseCase, IGetPaymentCollectionUseCase 
} from "../../../application/IUseCases/gym-memberships/IGymMembershipUseCases";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";


export class GymMembershipController {
    constructor(
        private _addMembershipUseCase: IAddMembershipUseCase,
        private _getMembershipsUseCase: IGetMembershipsUseCase,
        private _getMembershipByIdUseCase: IGetMembershipByIdUseCase,
        private _updateMembershipUseCase: IUpdateMembershipUseCase,
        private _deleteMembershipUseCase: IDeleteMembershipUseCase,
        private _addPaymentUseCase: IAddPaymentUseCase,
        private _updatePaymentUseCase: IUpdatePaymentUseCase,
        private _deletePaymentUseCase: IDeletePaymentUseCase,
        private _getPaymentCollectionUseCase: IGetPaymentCollectionUseCase
    ) { }

    async addMembership(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED 
            });
            const membership = await this._addMembershipUseCase.execute({ ...req.body, gymId });
            res.status(HttpStatus.CREATED).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.MEMBERSHIP_CREATE_SUCCESS, 
                data: membership 
            });
        } catch (error) {
            next(error)
        }
    }

    async getMemberships(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED 
            });

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || '';
            const status = req.query.status as string || '';

            const result = await this._getMembershipsUseCase.execute(gymId, page, limit, search, status);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message:ResponseMessage.GET_MEMBERSHIPS_SUCCESS,
                data: result });
        } catch (error) {
            next(error)
        }
    }

    async getMembershipById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            const id = req.params.id as string;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED 
            });
            const result = await this._getMembershipByIdUseCase.execute(id, gymId);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message : ResponseMessage.GET_MEMBERSHIP_SUCCESS,
                data: result });
        } catch (error) {
            next(error)
        }
    }

    async updateMembership(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            const id = req.params.id as string;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED 
            });
            const membership = await this._updateMembershipUseCase.execute({ ...req.body, membershipId: id, gymId });
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.MEMBERSHIP_UPDATE_SUCCESS, 
                data: membership 
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteMembership(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            const id = req.params.id as string;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED 
            });
            await this._deleteMembershipUseCase.execute(id, gymId);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.MEMBERSHIP_DELETE_SUCCESS 
            });
        } catch (error) {
            next(error)
        }
    }

    async addPayment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            const membershipId = req.params.membershipId as string;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED 
            });
            const payment = await this._addPaymentUseCase.execute({ ...req.body, membershipId, gymId });
            res.status(HttpStatus.CREATED).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.PAYMENT_ADD_SUCCESS, 
                data: payment 
            });
        } catch (error) {
            next(error)
        }
    }

    async updatePayment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const paymentId = req.params.paymentId as string;
            const payment = await this._updatePaymentUseCase.execute({ ...req.body, paymentId });
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.PAYMENT_UPDATE_SUCCESS, 
                data: payment 
            });
        } catch (error) {
            next(error)
        }
    }

    async deletePayment(req: Request, res: Response, next: NextFunction) {
        try {
            const paymentId = req.params.paymentId as string;
            await this._deletePaymentUseCase.execute(paymentId);
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message: ResponseMessage.PAYMENT_DELETE_SUCCESS 
            });
        } catch (error) {
            next(error)
        }
    }

    async getPayments(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(HttpStatus.UNAUTHORIZED).json({ 
                status: ResponseStatus.ERROR, 
                message: ResponseMessage.UNAUTHORIZED 
            });

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const defaultStartDate = new Date();
            defaultStartDate.setDate(1);
            defaultStartDate.setHours(0, 0, 0, 0);

            const startDate = req.query.startDate ? new Date(req.query.startDate as string) : defaultStartDate;
            const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
            endDate.setHours(23, 59, 59, 999);

            const result = await this._getPaymentCollectionUseCase.execute(gymId, page, limit, startDate, endDate);
            
            res.status(HttpStatus.OK).json({ 
                status: ResponseStatus.SUCCESS, 
                message:ResponseMessage.GET_PAYMENTS_SUCCESS,
                data: result });
        } catch (error) {
            next(error);
        }
    }
}

