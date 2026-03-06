import { Payment } from "../entities/Payment";

export interface IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    getPaymentsByMembershipId(membershipId: string): Promise<Payment[]>;
    update(paymentId: string, updates: Partial<Payment>): Promise<Payment | null>;
    delete(paymentId: string): Promise<boolean>;
    findById(paymentId: string): Promise<Payment | null>
}