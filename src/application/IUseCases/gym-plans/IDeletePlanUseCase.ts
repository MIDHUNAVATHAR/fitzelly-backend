export interface IDeletePlanUseCase {
    execute(planId: string, gymId: string): Promise<void>;
}
