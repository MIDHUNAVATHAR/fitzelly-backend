import { model } from "mongoose";
import { IExpenseDocument } from "../../../../shared/database/mongoose/types/IExpenseDocument";
import { ExpenseSchema } from "../../../../shared/database/mongoose/schemas/ExpenseSchema";

export const ExpenseModel = model<IExpenseDocument>("Expense", ExpenseSchema);
