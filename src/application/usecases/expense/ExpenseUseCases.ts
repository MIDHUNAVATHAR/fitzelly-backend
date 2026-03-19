import { Expense } from "../../../domain/entities/Expense";
import { IExpenseRepository } from "../../../domain/repositories/IExpenseRepository";
import { CreateExpenseRequestDTO, UpdateExpenseRequestDTO, ExpenseResponseDTO } from "../../dtos/expense/ExpenseDTO";
import { IAddExpenseUseCase, IGetExpensesUseCase, IUpdateExpenseUseCase, IDeleteExpenseUseCase } from "../../IUseCases/expense/IExpenseUseCases";

export class AddExpenseUseCase implements IAddExpenseUseCase {
    constructor(private _expenseRepository: IExpenseRepository) {}

    async execute(gymId: string, data: CreateExpenseRequestDTO): Promise<ExpenseResponseDTO> {
        const expense = new Expense(
            "",
            gymId,
            data.category,
            data.amount,
            data.notes || null,
            data.date ? new Date(data.date) : new Date()
        );
        const savedExpense = await this._expenseRepository.create(expense);
        return this._mapToResponseDTO(savedExpense);
    }

    private _mapToResponseDTO(expense: Expense): ExpenseResponseDTO {
        return {
            id: expense.id,
            gymId: expense.gymId,
            category: expense.category,
            amount: expense.amount,
            notes: expense.notes,
            date: expense.date
        };
    }
}

export class GetExpensesUseCase implements IGetExpensesUseCase {
    constructor(private _expenseRepository: IExpenseRepository) {}

    async execute(
        gymId: string,
        page: number,
        limit: number,
        category?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ expenses: ExpenseResponseDTO[]; total: number }> {
        const skip = (page - 1) * limit;
        const { expenses, totalCount } = await this._expenseRepository.getExpensesByGymId(
            gymId,
            skip,
            limit,
            category,
            startDate,
            endDate
        );

        return {
            expenses: expenses.map(e => ({
                id: e.id,
                gymId: e.gymId,
                category: e.category,
                amount: e.amount,
                notes: e.notes,
                date: e.date
            })),
            total: totalCount
        };
    }
}

export class UpdateExpenseUseCase implements IUpdateExpenseUseCase {
    constructor(private _expenseRepository: IExpenseRepository) {}

    async execute(id: string, data: UpdateExpenseRequestDTO): Promise<ExpenseResponseDTO> {
        const existing = await this._expenseRepository.findById(id);
        if (!existing) throw new Error("Expense not found");

        const updatedExpense = new Expense(
            existing.id,
            existing.gymId,
            data.category || existing.category,
            data.amount !== undefined ? data.amount : existing.amount,
            data.notes !== undefined ? data.notes : existing.notes,
            data.date ? new Date(data.date) : existing.date,
            existing.isDeleted
        );

        const saved = await this._expenseRepository.update(updatedExpense);
        return {
            id: saved.id,
            gymId: saved.gymId,
            category: saved.category,
            amount: saved.amount,
            notes: saved.notes,
            date: saved.date
        };
    }
}

export class DeleteExpenseUseCase implements IDeleteExpenseUseCase {
    constructor(private _expenseRepository: IExpenseRepository) {}

    async execute(id: string): Promise<boolean> {
        return await this._expenseRepository.deleteExpense(id);
    }
}
