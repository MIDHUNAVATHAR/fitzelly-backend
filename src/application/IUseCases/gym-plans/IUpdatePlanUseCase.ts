import { UpdatePlanDTO } from "../../dtos/gym-plan/PlanDTO";
import { PlanDTO } from "../../dtos/gym-plan/PlanDTO";

export interface IUpdatePlanUseCase {
    execute(planId: string, gymId: string, data: UpdatePlanDTO): Promise<PlanDTO>;
}
