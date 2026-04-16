import { SubscriptionPlan } from "../../domain/entities/SubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../domain/repositories/ISubscriptionPlanRepository";
import { SubscriptionPlanModel } from "../database/mongoose/models/SubscriptionPlanModel";
import { Types } from "mongoose";

export class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
    private toEntity(doc: { _id: Types.ObjectId; name: string; price: number; durationMonths: number; description: string; isDeleted: boolean; createdAt: Date; updatedAt: Date }): SubscriptionPlan {
        return new SubscriptionPlan(
            doc._id.toString(),
            doc.name,
            doc.price,
            doc.durationMonths,
            doc.description,
            doc.isDeleted,
            doc.createdAt,
            doc.updatedAt
        );
    }

    async create(entity: SubscriptionPlan): Promise<SubscriptionPlan> {
        const created = await SubscriptionPlanModel.create({
            name: entity.name,
            price: entity.price,
            durationMonths: entity.durationMonths,
            description: entity.description,
            isDeleted: entity.isDeleted
        });
        return this.toEntity(created);
    }

    async findById(id: string): Promise<SubscriptionPlan | null> {
        const doc = await SubscriptionPlanModel.findById(id);
        return doc ? this.toEntity(doc) : null;
    }

    async findByName(name: string): Promise<SubscriptionPlan | null> {
        const doc = await SubscriptionPlanModel.findOne({ name, isDeleted: false });
        return doc ? this.toEntity(doc) : null;
    }

    async findAll(): Promise<SubscriptionPlan[]> {
        const docs = await SubscriptionPlanModel.find();
        return docs.map(d => this.toEntity(d));
    }

    async findAllNotDeleted(): Promise<SubscriptionPlan[]> {
        const docs = await SubscriptionPlanModel.find({ isDeleted: false }).sort({ createdAt: -1 });
        return docs.map(d => this.toEntity(d));
    }

    async update(entity: SubscriptionPlan): Promise<SubscriptionPlan> {
        const updated = await SubscriptionPlanModel.findByIdAndUpdate(
            entity.id,
            { $set: entity },
            { new: true }
        );
        if (!updated) throw new Error("Plan not found");
        return this.toEntity(updated);
    }

    async updateById(id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> {
        const updated = await SubscriptionPlanModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        if (!updated) throw new Error("Plan not found");
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await SubscriptionPlanModel.findByIdAndUpdate(id, { $set: { isDeleted: true } });
        return !!deleted;
    }
}
