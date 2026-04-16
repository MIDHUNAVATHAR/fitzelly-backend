import { Payment } from "../entities/Payment";

export interface PaymentCollectionItem {
    id: string;
    membershipId: string;
    clientName: string;
    clientId: string;
    amount: number;
    paymentDate: Date;
    note?: string;
}

export interface IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    getPaymentsByMembershipId(membershipId: string): Promise<Payment[]>;
    update(paymentId: string, updates: Partial<Payment>): Promise<Payment | null>;
    delete(paymentId: string): Promise<boolean>;
    deleteManyByMembershipId(membershipId: string): Promise<boolean>;
    findById(paymentId: string): Promise<Payment | null>;
    getCollectionByGymId(gymId: string, page: number, limit: number, startDate: Date, endDate: Date): Promise<{ payments: PaymentCollectionItem[], total: number, totalAmount: number }>;
}