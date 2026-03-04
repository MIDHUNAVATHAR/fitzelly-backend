import { Plan } from "../entities/Plan";

export interface IPlanRepository {
    save(plan: Plan): Promise<Plan>
    findById(id: string): Promise<Plan | null>;
    findAllByGym(gymId: string): Promise<Plan[]>
}