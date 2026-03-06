import { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";
import { Payment } from "../../domain/entities/Payment";
import { PaymentModel } from "../database/mongoose/models/PaymentModel";
import { IPayment } from "../database/mongoose/types/IPayment";

export class PaymentRepository implements IPaymentRepository {
    async create(payment: Payment): Promise<Payment> {
        const doc = new PaymentModel({
            membershipId: payment.membershipId,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            note: payment.note
        });
        await doc.save();
        return this.mapToEntity(doc);
    }

    async getPaymentsByMembershipId(membershipId: string): Promise<Payment[]> {
        const docs = await PaymentModel.find({ membershipId, isDeleted: false })
            .sort({ paymentDate: -1, createdAt: -1 })
            .exec();
        return docs.map(doc => this.mapToEntity(doc));
    }

    async update(paymentId: string, updates: Partial<Payment>): Promise<Payment | null> {
        const doc = await PaymentModel.findOneAndUpdate(
            { _id: paymentId, isDeleted: false },
            { $set: updates },
            { new: true }
        ).exec();
        return doc ? this.mapToEntity(doc) : null;
    }

    async delete(paymentId: string): Promise<boolean> {
        const result = await PaymentModel.updateOne(
            { _id: paymentId },
            { $set: { isDeleted: true } }
        ).exec();
        return result.modifiedCount > 0;
    }

    async findById(paymentId: string): Promise<Payment | null> {
        const doc = await PaymentModel.findOne({ _id: paymentId, isDeleted: false }).exec();
        return doc ? this.mapToEntity(doc) : null;
    }

    private mapToEntity(doc: IPayment): Payment {
        return new Payment(
            doc._id.toString(),
            doc.membershipId,
            doc.amount,
            doc.paymentDate,
            doc.note,
            doc.isDeleted
        );
    }
}
