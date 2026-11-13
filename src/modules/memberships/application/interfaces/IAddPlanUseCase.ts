import { CreatePlanDTO } from "../dtos/PlanDTO";
import { PlanDTO } from "../dtos/PlanDTO";

export interface IAddPlanUseCase {
    execute(data: CreatePlanDTO): Promise<PlanDTO>;
}
