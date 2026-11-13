import { model } from "mongoose";
import { IWorkoutLogDocument } from "../../../../shared/database/mongoose/types/IWorkoutLogDocument";
import { WorkoutLogSchema } from "../../../../shared/database/mongoose/schemas/WorkoutLogSchema";

export const WorkoutLogModel = model<IWorkoutLogDocument>("WorkoutLog", WorkoutLogSchema); 