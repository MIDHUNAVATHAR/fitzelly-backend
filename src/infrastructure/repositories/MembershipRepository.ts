import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { Membership } from "../../domain/entities/Membership";
import { MembershipModel } from "../database/mongoose/models/MembershipModel";


export class MembershipRepository implements IMembershipRepository{
    async findLatestByClientId(clientId: string): Promise<Membership | null> {
        const doc = await MembershipModel.findOne({ clientId, isDeleted: false })
            .sort({ createdAt: -1 })
            .exec();
        return doc ? this.mapToEntity(doc) : null;
    }

    async findLatestByClientIds(clientIds: string[]): Promise<Membership[]> {
        const docs = await MembershipModel.aggregate([
            { $match: { clientId: { $in: clientIds }, isDeleted: false } },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: "$clientId",
                    doc: { $first: "$$ROOT" }
                }
            },
            { $replaceRoot: { newRoot: "$doc" } }
        ]).exec();

        return docs.map(doc => this.mapToEntity(doc));
    }

    async create(membership: Membership): Promise<Membership> {
        const doc = new MembershipModel({
            clientId: membership.clientId,
            clientName: membership.clientName,
            gymId: membership.gymId,
            planId: membership.planId,
            planName: membership.planName,
            planAmount: membership.planAmount,
            planType: membership.planType,
            startDate: membership.startDate,
            expiryDate: membership.expiryDate,
            status: membership.status,
            daysLeft: membership.daysLeft,
            assignedTrainerId: membership.assignedTrainerId,
            assignedTrainerName: membership.assignedTrainerName
        });
        await doc.save();
        return this.mapToEntity(doc);
    }

    async findById(id: string): Promise<Membership | null> {
        const doc = await MembershipModel.findOne({ _id: id, isDeleted: false }).exec();
        return doc ? this.mapToEntity(doc) : null;
    }

    async findByGymId(gymId: string): Promise<Membership[]> {
        const docs = await MembershipModel.find({ gymId, isDeleted: false })
            .sort({ createdAt: -1 })
            .exec();
        return docs.map(doc => this.mapToEntity(doc));
    }

    async update(id: string, updates: Partial<Membership>): Promise<Membership | null> {
        const updatedDoc = await MembershipModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: updates },
            { new: true }
        ).exec();
        return updatedDoc ? this.mapToEntity(updatedDoc) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await MembershipModel.updateOne(
            { _id: id },
            { $set: { isDeleted: true } }
        ).exec();
        return result.modifiedCount > 0;
    }

    private mapToEntity(doc: any): Membership {
        return new Membership(
            doc._id.toString(),
            doc.clientId,
            doc.clientName,
            doc.gymId,
            doc.planId,
            doc.planName,
            doc.planAmount,
            doc.planType,
            doc.startDate,
            doc.expiryDate,
            doc.status,
            doc.daysLeft,
            doc.assignedTrainerId,
            doc.assignedTrainerName,
            doc.isDeleted
        );
    }
}