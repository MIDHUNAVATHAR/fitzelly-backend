import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { AppError } from "../../errors/AppError";
import { 
    IAddSubscriptionPlanUseCase, 
    IGetAllSubscriptionPlansUseCase, 
    IUpdateSubscriptionPlanUseCase, 
    IDeleteSubscriptionPlanUseCase,
    ICreatePlanDTO
} from "../../IUseCases/superAdmin-plans/ISubscriptionPlanUseCases";

export class AddSubscriptionPlanUseCase implements IAddSubscriptionPlanUseCase {
    constructor(private _repository: ISubscriptionPlanRepository) {}

    async execute(data: ICreatePlanDTO): Promise<SubscriptionPlan> {
        const existing = await this._repository.findByName(data.name);
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
        return this._repository.create(plan);
    }
}

export class GetAllSubscriptionPlansUseCase implements IGetAllSubscriptionPlansUseCase {
    constructor(private _repository: ISubscriptionPlanRepository) {}

    async execute(): Promise<SubscriptionPlan[]> {
        return this._repository.findAllNotDeleted();
    }
}

export class UpdateSubscriptionPlanUseCase implements IUpdateSubscriptionPlanUseCase {
    constructor(private _repository: ISubscriptionPlanRepository) {}

    async execute(id: string, data: Partial<ICreatePlanDTO>): Promise<SubscriptionPlan> {
        return this._repository.updateById(id, data);
    }
}

export class DeleteSubscriptionPlanUseCase implements IDeleteSubscriptionPlanUseCase {
    constructor(private _repository: ISubscriptionPlanRepository) {}

    async execute(id: string): Promise<boolean> {
        return this._repository.delete(id);
    }
}
