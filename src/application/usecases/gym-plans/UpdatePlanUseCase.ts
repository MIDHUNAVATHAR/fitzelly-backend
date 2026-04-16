import { IUpdatePlanUseCase } from "../../IUseCases/gym-plans/IUpdatePlanUseCase";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { PlanDTO, UpdatePlanDTO } from "../../dtos/gym-plan/PlanDTO";
import { PlanMapper } from "../../mapper/GymPlanMapper";
import { ConflictError } from "../../errors/AppError";



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

        /**
         * check the plan name and type  already exists.
         * and if plan type is category_based, then reset window period to 0
         */

        const planWithSameNameAndType = await this.planRepository.findByNameAndPlan(data.planName.trim(), data.planType)
        if (planWithSameNameAndType) {
            if (planWithSameNameAndType.id !== existingPlan.id) {
                throw new ConflictError("Plan already exists")
            }
        }

        /**
         * plan type is catgetory_based, set windowperiod as undefined and 
         * plan type is daybased , ensure min window period is plan.validity
         */
        const updatingData = data;
        if (data.planType == "CATEGORY_BASED") {
            updatingData.windowPeriod = undefined;
        } else if (data.windowPeriod == 0 && data.planType == "DAY_BASED") {
            updatingData.windowPeriod = data.validity
        }


        existingPlan.update(updatingData);



        const updatedPlan = await this.planRepository.save(existingPlan);
        return PlanMapper.toDTO(updatedPlan);
    }
}
