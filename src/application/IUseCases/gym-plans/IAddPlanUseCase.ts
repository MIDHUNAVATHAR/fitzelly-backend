import { CreatePlanDTO } from "../../dtos/gym-plan/PlanDTO";
import { PlanDTO } from "../../dtos/gym-plan/PlanDTO";

export interface IAddPlanUseCase {
    execute(data: CreatePlanDTO): Promise<PlanDTO>;
}
