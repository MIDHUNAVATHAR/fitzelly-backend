import { PlanDTO } from "../../dtos/gym-plan/PlanDTO";


export interface IGetPlansUseCase {
    execute(gymId: string, page: number, limit: number, search: string): Promise<{ plans: PlanDTO[], total: number }>;
}
