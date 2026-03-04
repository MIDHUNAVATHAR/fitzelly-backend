import { Plan } from "../../domain/entities/Plan";
import { IPlanRepository } from "../../domain/repositories/IPlanRepository";


import { PlanModel } from "../database/mongoose/models/PlanModel";

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

    async findAllByGym(gymId: string): Promise<Plan[]> {
        const plans = await PlanModel.find({ gymId, isDeleted: false }).sort({ createdAt: -1 }).exec();
        return plans.map(this.mapToEntity);
    }

    private mapToEntity(doc:any ): Plan {
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
