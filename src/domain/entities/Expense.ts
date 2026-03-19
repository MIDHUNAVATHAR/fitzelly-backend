export type ExpenseCategory = 
    | "RENT" 
    | "ELECTRICITY" 
    | "WATER" 
    | "INSURANCE_TAX" 
    | "MARKETING" 
    | "MAINTENANCE" 
    | "OTHER";

export class Expense {
    constructor(
        public readonly id: string,
        public readonly gymId: string,
        public readonly category: ExpenseCategory,
        public readonly amount: number,
        public readonly notes: string | null,
        public readonly date: Date,
        public readonly isDeleted: boolean = false
    ) {}
}
