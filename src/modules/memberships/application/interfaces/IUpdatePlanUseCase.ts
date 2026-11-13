import { UpdatePlanDTO } from "../dtos/PlanDTO";
import { PlanDTO } from "../dtos/PlanDTO";

export interface IUpdatePlanUseCase {
    execute(planId: string, gymId: string, data: UpdatePlanDTO): Promise<PlanDTO>;
}
