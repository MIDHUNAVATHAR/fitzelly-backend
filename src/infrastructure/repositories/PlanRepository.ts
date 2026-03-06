import { Plan } from "../../domain/entities/Plan";
import { IPlanRepository } from "../../domain/repositories/IPlanRepository";

import { PlanModel } from "../database/mongoose/models/PlanModel";
import { IPlan } from "../database/mongoose/types/IMembershipPlan";

export class PlanRepository implements IPlanRepository {
    async save(plan: Plan): Promise<Plan> {
        let savedDoc;

        if (plan.id) {
            const updated = await PlanModel.findByIdAndUpdate(
                plan.id,
                {
                    planName: plan.planName,
                    planType: plan.planType,
                    validity: plan.validity,
                    price: plan.price,
                    windowPeriod: plan.windowPeriod,
                    description: plan.description,
                    isDeleted: plan.isDeleted
                },
                { new: true }
            ).exec();

            if (!updated) {
                throw new Error('Plan not found');
            }
            savedDoc = updated;
        } else {
            const newPlan = new PlanModel({
                gymId: plan.gymId,
                planName: plan.planName,
                planType: plan.planType,
                validity: plan.validity,
                price: plan.price,
                windowPeriod: plan.windowPeriod,
                description: plan.description,
                isDeleted: plan.isDeleted
            });
            savedDoc = await newPlan.save();
        }

        return this.mapToEntity(savedDoc);
    }

    async findById(id: string): Promise<Plan | null> {
        const plan = await PlanModel.findById(id).exec();
        return plan ? this.mapToEntity(plan) : null;
    }

    async findAllByGym(gymId: string, page: number = 1, limit: number = 10, search: string = ''): Promise<{ plans: Plan[], total: number }> {
        const query: Record<string, unknown> = { gymId, isDeleted: false };
        if (search) {
            query.planName = { $regex: search, $options: 'i' };
        }

        const skip = (page - 1) * limit;
        const [plans, total] = await Promise.all([
            PlanModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            PlanModel.countDocuments(query)
        ]);

        return {
            plans: plans.map(this.mapToEntity),
            total
        };
    }

    async findByNameAndPlan(planName: string, planType: string): Promise<Plan | null> {
        const existingPlan = await PlanModel.findOne({ planName, planType, isDeleted: false });

        return existingPlan ? this.mapToEntity(existingPlan) : null;
    }

    private mapToEntity(doc: IPlan): Plan {
        return new Plan(
            doc._id.toString(),
            doc.gymId.toString(),
            doc.planName,
            doc.planType,
            doc.validity,
            doc.price,
            doc.windowPeriod,
            doc.description,
            doc.isDeleted
        );
    }
}
