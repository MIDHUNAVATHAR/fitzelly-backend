import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { AppError } from "../../errors/AppError";

interface CreatePlanDTO {
    name: string;
    price: number;
    durationMonths: number;
    description?: string;
}

export class AddSubscriptionPlanUseCase {
    constructor(private repository: ISubscriptionPlanRepository) {}

    async execute(data: CreatePlanDTO): Promise<SubscriptionPlan> {
        const existing = await this.repository.findByName(data.name);
        if (existing) {
            throw new AppError("Plan with this name already exists", 400);
        }

        const plan = new SubscriptionPlan(
            "",
            data.name,
            data.price,
            data.durationMonths,
            data.description
        );
        return this.repository.create(plan);
    }
}

export class GetAllSubscriptionPlansUseCase {
    constructor(private repository: ISubscriptionPlanRepository) {}

    async execute(): Promise<SubscriptionPlan[]> {
        return this.repository.findAllNotDeleted();
    }
}

export class UpdateSubscriptionPlanUseCase {
    constructor(private repository: ISubscriptionPlanRepository) {}

    async execute(id: string, data: Partial<CreatePlanDTO>): Promise<SubscriptionPlan> {
        return this.repository.updateById(id, data);
    }
}

export class DeleteSubscriptionPlanUseCase {
    constructor(private repository: ISubscriptionPlanRepository) {}

    async execute(id: string): Promise<boolean> {
        return this.repository.delete(id);
    }
}
