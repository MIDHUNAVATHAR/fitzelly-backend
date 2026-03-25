import { Payment } from "../entities/Payment";

export interface IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    getPaymentsByMembershipId(membershipId: string): Promise<Payment[]>;
    update(paymentId: string, updates: Partial<Payment>): Promise<Payment | null>;
    delete(paymentId: string): Promise<boolean>;
    deleteManyByMembershipId(membershipId: string): Promise<boolean>;
    findById(paymentId: string): Promise<Payment | null>;
    getCollectionByGymId(gymId: string, page: number, limit: number, startDate: Date, endDate: Date): Promise<{ payments: any[], total: number, totalAmount: number }>;
}