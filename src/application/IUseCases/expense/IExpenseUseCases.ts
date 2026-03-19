import { CreateExpenseRequestDTO, UpdateExpenseRequestDTO, ExpenseResponseDTO } from "../../dtos/expense/ExpenseDTO";

export interface IAddExpenseUseCase {
    execute(gymId: string, data: CreateExpenseRequestDTO): Promise<ExpenseResponseDTO>;
}

export interface IGetExpensesUseCase {
    execute(
        gymId: string,
        page: number,
        limit: number,
        category?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ expenses: ExpenseResponseDTO[]; total: number }>;
}

export interface IUpdateExpenseUseCase {
    execute(id: string, data: UpdateExpenseRequestDTO): Promise<ExpenseResponseDTO>;
}

export interface IDeleteExpenseUseCase {
    execute(id: string): Promise<boolean>;
}
