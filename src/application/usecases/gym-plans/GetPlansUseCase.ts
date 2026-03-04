import { IGetPlansUseCase } from "../../IUseCases/gym-plans/IGetPlansUseCase";
import { IPlanRepository } from "../../../domain/repositories/IPlanRepository";
import { PlanDTO } from "../../dtos/gym-plan/PlanDTO";
import { PlanMapper } from "../../mapper/GymPlanMapper";


export class GetPlansUseCase implements IGetPlansUseCase {
    constructor(private planRepository: IPlanRepository) { }

    async execute(gymId: string): Promise<PlanDTO[]> {
        const plans = await this.planRepository.findAllByGym(gymId);
        return plans.map(PlanMapper.toDTO);
    }
}
