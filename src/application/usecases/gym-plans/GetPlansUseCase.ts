import { IGetPlansUseCase } from "../../IUseCases/gym-plans/IGetPlansUseCase";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { PlanDTO } from "../../dtos/gym-plan/PlanDTO";
import { PlanMapper } from "../../mapper/GymPlanMapper";


export class GetPlansUseCase implements IGetPlansUseCase {
    constructor(private planRepository: IPlanRepository) { }

    async execute(gymId: string, page: number, limit: number, search: string): Promise<{ plans: PlanDTO[], total: number }> {
        const result = await this.planRepository.findAllByGym(gymId, page, limit, search);
        return {
            plans: result.plans.map(PlanMapper.toDTO),
            total: result.total
        };
    }
}
