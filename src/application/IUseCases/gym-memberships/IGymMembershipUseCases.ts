import { Membership } from "../../../domain/entities/Membership";
import { Payment } from "../../../domain/entities/Payment";
import { PaymentCollectionItem } from "../../../domain/repositories/IPaymentRepository";
import { AddMembershipDTO } from "../../dtos/gym-client/MembershipDTO";
import {UpdateMembershipDTO} from "../../dtos/client-profile/ClientProfileDTO";
import { AddPaymentDTO } from "../../dtos/gym-client/ClientProfileWithMembershipDTO";
import { UpdatePaymentDTO } from "../../dtos/gym-client/ClientProfileWithMembershipDTO";


export interface IMembershipListItem {
    id: string;
    clientId: string;
    clientName: string;
    planId: string;
    planName: string;
    planType: string;
    startDate: Date;
    expiryDate: Date | null;
    status: string;
    daysLeft: number | null;
    assignedTrainerId: string | null;
    assignedTrainerName: string | null;
    paymentStatus: string;
    totalPaid: number;
    planAmount: number;
}


export interface IGetMembershipsResult {
    memberships: IMembershipListItem[];
    total: number;
}

export interface IGetMembershipByIdResult {
    membership: Membership;
    paymentSummary: {
        totalPaid: number;
        planAmount: number;
        paymentStatus: string;
        payments: Payment[];
    };
}

export interface IAddMembershipUseCase {
    execute(data: AddMembershipDTO): Promise<Membership>;
}

export interface IGetMembershipsUseCase {
    execute(gymId: string, page: number, limit: number, search: string, status: string): Promise<IGetMembershipsResult>;
}

export interface IGetMembershipByIdUseCase {
    execute(id: string, gymId: string): Promise<IGetMembershipByIdResult>;
}

export interface IUpdateMembershipUseCase {
    execute(data: UpdateMembershipDTO): Promise<Membership | null>;
}

export interface IDeleteMembershipUseCase {
    execute(id: string, gymId: string): Promise<boolean>;
}

export interface IAddPaymentUseCase {
    execute(data: AddPaymentDTO): Promise<Payment>;
}

export interface IUpdatePaymentUseCase {
    execute(data: UpdatePaymentDTO): Promise<Payment | null>;
}

export interface IDeletePaymentUseCase {
    execute(paymentId: string): Promise<boolean>;
}

export interface IGetPaymentCollectionUseCase {
    execute(gymId: string, page: number, limit: number, startDate: Date, endDate: Date): Promise<{ payments: PaymentCollectionItem[], total: number, totalAmount: number }>;
}
