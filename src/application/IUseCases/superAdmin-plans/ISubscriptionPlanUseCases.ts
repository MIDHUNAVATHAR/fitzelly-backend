import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan";

export interface ICreatePlanDTO {
    name: string;
    price: number;
    durationMonths: number;
    description?: string;
}

export interface IAddSubscriptionPlanUseCase {
    execute(data: ICreatePlanDTO): Promise<SubscriptionPlan>;
}

export interface IGetAllSubscriptionPlansUseCase {
    execute(): Promise<SubscriptionPlan[]>;
}

export interface IUpdateSubscriptionPlanUseCase {
    execute(id: string, data: Partial<ICreatePlanDTO>): Promise<SubscriptionPlan>;
}

export interface IDeleteSubscriptionPlanUseCase {
    execute(id: string): Promise<boolean>;
}
