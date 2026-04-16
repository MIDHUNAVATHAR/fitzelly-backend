import { IPaymentRepository, PaymentCollectionItem } from "../../domain/repositories/IPaymentRepository";
import { Payment } from "../../domain/entities/Payment";
import { PaymentModel } from "../database/mongoose/models/PaymentModel";
import { IPayment } from "../database/mongoose/types/IPayment";
import { PipelineStage } from "mongoose";

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

    async deleteManyByMembershipId(membershipId: string): Promise<boolean> {
        const result = await PaymentModel.updateMany(
            { membershipId },
            { $set: { isDeleted: true } }
        ).exec();
        return result.modifiedCount > 0;
    }

    async findById(paymentId: string): Promise<Payment | null> {
        const doc = await PaymentModel.findOne({ _id: paymentId, isDeleted: false }).exec();
        return doc ? this.mapToEntity(doc) : null;
    }

    async getCollectionByGymId(gymId: string, page: number, limit: number, startDate: Date, endDate: Date): Promise<{ payments: PaymentCollectionItem[], total: number, totalAmount: number }> {
        const skip = (page - 1) * limit;

        const pipeline: PipelineStage[] = [
            { $match: { isDeleted: false, paymentDate: { $gte: startDate, $lte: endDate } } },
            {
                $addFields: {
                    membershipObjectId: { $toObjectId: "$membershipId" }
                }
            },
            {
                $lookup: {
                    from: "memberships",
                    localField: "membershipObjectId",
                    foreignField: "_id",
                    as: "membership"
                }
            },
            { $unwind: "$membership" },
            { $match: { "membership.gymId": gymId, "membership.isDeleted": false } },
            {
                $addFields: {
                    clientObjectId: { $toObjectId: "$membership.clientId" }
                }
            },
            {
                $lookup: {
                    from: "clients",
                    localField: "clientObjectId",
                    foreignField: "_id",
                    as: "client"
                }
            },
            { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } }
        ];

        const [results, statsResult] = await Promise.all([
            PaymentModel.aggregate([...pipeline, { $sort: { paymentDate: -1, createdAt: -1 } }, { $skip: skip }, { $limit: limit }]).exec(),
            PaymentModel.aggregate([...pipeline, { $group: { _id: null, total: { $sum: 1 }, totalAmount: { $sum: "$amount" } } }]).exec()
        ]);

        return {
            payments: results.map(p => ({
                id: p._id.toString(),
                membershipId: p.membershipId,
                clientName: p.membership.clientName,
                clientId: p.client?.clientId || 'N/A',
                amount: p.amount,
                paymentDate: p.paymentDate,
                note: p.note
            })),
            total: statsResult[0]?.total || 0,
            totalAmount: statsResult[0]?.totalAmount || 0
        };
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
