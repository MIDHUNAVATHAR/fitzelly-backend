import { model } from "mongoose";
import { IWeightLogDocument } from "../types/IWeightLogDocument";
import { WeightLogSchema } from "../schemas/WeightLogSchema";

export const WeightLogModel = model<IWeightLogDocument>("WeightLog", WeightLogSchema);
