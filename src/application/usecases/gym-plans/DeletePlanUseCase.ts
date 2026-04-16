import { IDeletePlanUseCase } from "../../IUseCases/gym-plans/IDeletePlanUseCase";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";

export class DeletePlanUseCase implements IDeletePlanUseCase {
    constructor(private planRepository: IPlanRepository) { }

    async execute(planId: string, gymId: string): Promise<void> {
        const existingPlan = await this.planRepository.findById(planId);

        if (!existingPlan) {
            throw new Error("Plan not found");
        }

        if (existingPlan.gymId !== gymId) {
            throw new Error("Unauthorized to access this plan");
        }

        existingPlan.delete();
        await this.planRepository.save(existingPlan);
    }
}
