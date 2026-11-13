import { model } from "mongoose";
import { IWeightLogDocument } from "../../../../shared/database/mongoose/types/IWeightLogDocument";
import { WeightLogSchema } from "../../../../shared/database/mongoose/schemas/WeightLogSchema";

export const WeightLogModel = model<IWeightLogDocument>("WeightLog", WeightLogSchema);
