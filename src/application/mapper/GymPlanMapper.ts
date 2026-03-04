import { Plan } from "../../domain/entities/Plan";
import { PlanDTO } from "../dtos/gym-plan/PlanDTO";


export class PlanMapper {
    static toDTO(plan: Plan): PlanDTO {
        return {
            id: plan.id,
            gymId: plan.gymId,
            planName: plan.planName,
            planType: plan.planType,
            validity: plan.validity,
            price: plan.price,
            windowPeriod: plan.windowPeriod,
            description: plan.description,
            isDeleted: plan.isDeleted
        };
    }
}
