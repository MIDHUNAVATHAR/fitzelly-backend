import { Expense, ExpenseCategory } from "../../domain/entities/Expense";
import { IExpenseDocument } from "../database/mongoose/types/IExpenseDocument";

export class ExpenseMapper {
    static toEntity(doc: IExpenseDocument): Expense {
        return new Expense(
            doc._id.toString(),
            doc.gymId,
            doc.category as ExpenseCategory,
            doc.amount,
            doc.notes,
            doc.date,
            doc.isDeleted
        );
    }

    static toDocument(entity: Expense): Partial<IExpenseDocument> {
        return {
            gymId: entity.gymId,
            category: entity.category,
            amount: entity.amount,
            notes: entity.notes,
            date: entity.date,
            isDeleted: entity.isDeleted
        };
    }
}
