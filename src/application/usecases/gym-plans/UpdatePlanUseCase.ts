import { IUpdatePlanUseCase } from "../../IUseCases/gym-plans/IUpdatePlanUseCase";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { PlanDTO,UpdatePlanDTO } from "../../dtos/gym-plan/PlanDTO";
import { PlanMapper } from "../../mapper/GymPlanMapper";



export class UpdatePlanUseCase implements IUpdatePlanUseCase {
    constructor(private planRepository: IPlanRepository) { }

    async execute(planId: string, gymId: string, data: UpdatePlanDTO): Promise<PlanDTO> {
        const existingPlan = await this.planRepository.findById(planId);

        if (!existingPlan) {
            throw new Error("Plan not found");
        }

        if (existingPlan.gymId !== gymId) {
            throw new Error("Unauthorized to access this plan");
        }

        existingPlan.update(data);

        const updatedPlan = await this.planRepository.save(existingPlan);
        return PlanMapper.toDTO(updatedPlan);
    }
}
