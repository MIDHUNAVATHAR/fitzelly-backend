import { ExpenseCategory } from "../../../domain/entities/Expense";

export interface CreateExpenseRequestDTO {
    category: ExpenseCategory;
    amount: number;
    notes?: string;
    date?: Date;
}

export interface UpdateExpenseRequestDTO {
    category?: ExpenseCategory;
    amount?: number;
    notes?: string;
    date?: Date;
}

export interface ExpenseResponseDTO {
    id: string;
    gymId: string;
    category: ExpenseCategory;
    amount: number;
    notes: string | null;
    date: Date;
}
