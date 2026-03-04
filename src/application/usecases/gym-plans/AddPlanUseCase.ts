import { IAddPlanUseCase } from "../../IUseCases/gym-plans/IAddPlanUseCase";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { CreatePlanDTO,PlanDTO } from "../../dtos/gym-plan/PlanDTO";
import { Plan } from "../../../domain/entities/Plan";
import { PlanMapper } from "../../mapper/GymPlanMapper";

export class AddPlanUseCase implements IAddPlanUseCase {
    constructor(private planRepository: IPlanRepository) { }

    async execute(data: CreatePlanDTO): Promise<PlanDTO> {
        const plan = new Plan(
            "",
            data.gymId,
            data.planName,
            data.planType,
            data.validity,
            data.price,
            data.windowPeriod || 0,
            data.description || "",
            false
        );

        const createdPlan = await this.planRepository.save(plan);
        return PlanMapper.toDTO(createdPlan);
    }
}
