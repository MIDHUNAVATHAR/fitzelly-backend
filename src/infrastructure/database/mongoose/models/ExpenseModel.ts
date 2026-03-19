import { model } from "mongoose";
import { IExpenseDocument } from "../types/IExpenseDocument";
import { ExpenseSchema } from "../schemas/ExpenseSchema";

export const ExpenseModel = model<IExpenseDocument>("Expense", ExpenseSchema);
