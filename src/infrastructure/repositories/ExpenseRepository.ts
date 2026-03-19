import { Expense } from "../../domain/entities/Expense";
import { IExpenseRepository } from "../../domain/repositories/IExpenseRepository";
import { ExpenseModel } from "../database/mongoose/models/ExpenseModel";
import { IExpenseDocument } from "../database/mongoose/types/IExpenseDocument";
import { BaseRepository } from "./BaseRepository";
import { ExpenseMapper } from "../mapper/ExpenseMapper";

export class ExpenseRepository extends BaseRepository<Expense, IExpenseDocument> implements IExpenseRepository {
    constructor() {
        super(ExpenseModel);
    }

    protected toEntity(doc: IExpenseDocument): Expense {
        return ExpenseMapper.toEntity(doc);
    }

    protected toDocument(entity: Expense): Partial<IExpenseDocument> {
        return ExpenseMapper.toDocument(entity);
    }

    async getExpensesByGymId(
        gymId: string,
        skip: number,
        limit: number,
        category?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ expenses: Expense[]; totalCount: number }> {
        const query = {
            gymId,
            isDeleted: false,
            ...(category && { category }),
            ...((startDate || endDate) ? {
                date: {
                    ...(startDate && { $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)) }),
                    ...(endDate && { $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)) })
                }
            } : {})
        };

        const [docs, totalCount] = await Promise.all([
            this.model.find(query).sort({ date: -1 }).skip(skip).limit(limit).exec(),
            this.model.countDocuments(query).exec()
        ]);

        return {
            expenses: docs.map(doc => this.toEntity(doc)),
            totalCount
        };
    }

    async deleteExpense(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndUpdate(id, { $set: { isDeleted: true } });
        return !!result;
    }
}
