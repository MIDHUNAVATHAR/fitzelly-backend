import { PlanDTO } from "../../dtos/gym-plan/PlanDTO";


export interface IGetPlansUseCase {
    execute(gymId: string): Promise<PlanDTO[]>;
}
