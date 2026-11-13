import { Expense } from "../../domain/entities/Expense";
import { IBaseRepository } from "../../../../shared/database/BaseRepository";

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
