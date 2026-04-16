import { Plan } from "../entities/Plan";

export interface IPlanRepository {
    save(plan: Plan): Promise<Plan>
    findById(id: string): Promise<Plan | null>;
    findAllByGym(gymId: string, page?: number, limit?: number, search?: string): Promise<{ plans: Plan[], total: number }>
    findByNameAndPlan(planName: string, planType: string): Promise<Plan | null>;
}




