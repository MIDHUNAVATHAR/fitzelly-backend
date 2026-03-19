import { Expense } from "../entities/Expense";
import { IBaseRepository } from "./IBaseRepository";

export interface IExpenseRepository extends IBaseRepository<Expense> {
    getExpensesByGymId(
        gymId: string,
        skip: number,
        limit: number,
        category?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ expenses: Expense[]; totalCount: number }>;
    
    deleteExpense(id: string): Promise<boolean>;
}
