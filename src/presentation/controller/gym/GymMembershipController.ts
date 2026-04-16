import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { AddMembershipUseCase } from "../../../application/usecases/gym-memberships/AddMembershipUseCase";
import { GetMembershipsUseCase } from "../../../application/usecases/gym-memberships/GetMembershipsUseCase";

import { GetMembershipByIdUseCase } from "../../../application/usecases/gym-memberships/GetMembershipByIdUseCase";
import { UpdateMembershipUseCase } from "../../../application/usecases/gym-memberships/UpdateMembershipUseCase";
import { DeleteMembershipUseCase } from "../../../application/usecases/gym-memberships/DeleteMembershipUseCase";
import { AddPaymentUseCase } from "../../../application/usecases/gym-memberships/AddPaymentUseCase";
import { UpdatePaymentUseCase } from "../../../application/usecases/gym-memberships/UpdatePaymentUseCase";
import { DeletePaymentUseCase } from "../../../application/usecases/gym-memberships/DeletePaymentUseCase";
import { GetPaymentCollectionUseCase } from "../../../application/usecases/gym-memberships/GetPaymentCollectionUseCase";



export class GymMembershipController {
    constructor(
        private addMembershipUseCase: AddMembershipUseCase,
        private getMembershipsUseCase: GetMembershipsUseCase,
        private getMembershipByIdUseCase: GetMembershipByIdUseCase,
        private updateMembershipUseCase: UpdateMembershipUseCase,
        private deleteMembershipUseCase: DeleteMembershipUseCase,
        private addPaymentUseCase: AddPaymentUseCase,
        private updatePaymentUseCase: UpdatePaymentUseCase,
        private deletePaymentUseCase: DeletePaymentUseCase,
        private getPaymentCollectionUseCase: GetPaymentCollectionUseCase
    ) { }

    async addMembership(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });
            const membership = await this.addMembershipUseCase.execute({ ...req.body, gymId });
            res.status(201).json({ success: true, message: "Membership created successfully", data: membership });
        } catch (error) {
            next(error)
        }
    }

    async getMemberships(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || '';
            const status = req.query.status as string || '';

            const result = await this.getMembershipsUseCase.execute(gymId, page, limit, search, status);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error)
        }
    }

    async getMembershipById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            const id = req.params.id as string;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });
            const result = await this.getMembershipByIdUseCase.execute(id, gymId);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error)
        }
    }

    async updateMembership(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            const id = req.params.id as string;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });
            const membership = await this.updateMembershipUseCase.execute({ ...req.body, membershipId: id, gymId });
            res.status(200).json({ success: true, message: "Membership updated successfully", data: membership });
        } catch (error) {
            next(error)
        }
    }

    async deleteMembership(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            const id = req.params.id as string;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });
            await this.deleteMembershipUseCase.execute(id, gymId);
            res.status(200).json({ success: true, message: "Membership deleted successfully" });
        } catch (error) {
            next(error)
        }
    }

    async addPayment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            const membershipId = req.params.membershipId as string;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });
            const payment = await this.addPaymentUseCase.execute({ ...req.body, membershipId, gymId });
            res.status(201).json({ success: true, message: "Payment added successfully", data: payment });

        } catch (error) {
            next(error)
        }
    }

    async updatePayment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const paymentId = req.params.paymentId as string;
            const payment = await this.updatePaymentUseCase.execute({ ...req.body, paymentId });
            res.status(200).json({ success: true, message: "Payment updated successfully", data: payment });
        } catch (error) {
            next(error)
        }
    }

    async deletePayment(req: Request, res: Response, next: NextFunction) {
        try {
            const paymentId = req.params.paymentId as string;
            await this.deletePaymentUseCase.execute(paymentId);
            res.status(200).json({ success: true, message: "Payment deleted successfully" });
        } catch (error) {
            next(error)
        }
    }

    async getPayments(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user?.id;
            if (!gymId) return res.status(401).json({ success: false, message: "Unauthorized" });

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const defaultStartDate = new Date();
            defaultStartDate.setDate(1);
            defaultStartDate.setHours(0, 0, 0, 0);

            const startDate = req.query.startDate ? new Date(req.query.startDate as string) : defaultStartDate;
            const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
            endDate.setHours(23, 59, 59, 999);

            const result = await this.getPaymentCollectionUseCase.execute(gymId, page, limit, startDate, endDate);
            
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }
}
