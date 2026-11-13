import { IGetPlansUseCase } from "../interfaces/IGetPlansUseCase";
import { IPlanRepository } from "../../domain/repositories/IPlanRepository";
import { PlanDTO } from "../dtos/PlanDTO";
import { PlanMapper } from "../dtos/GymPlanMapper";


export class GetPlansUseCase implements IGetPlansUseCase {
    constructor(private _planRepository: IPlanRepository) { }

    async execute(gymId: string, page: number, limit: number, search: string): Promise<{ plans: PlanDTO[], total: number }> {
        const result = await this._planRepository.findAllByGym(gymId, page, limit, search);
        return {
            plans: result.plans.map(PlanMapper.toDTO),
            total: result.total
        };
    }
}
