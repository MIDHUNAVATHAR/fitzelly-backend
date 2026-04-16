import { model } from "mongoose";
import { IWorkoutLogDocument } from "../types/IWorkoutLogDocument";
import { WorkoutLogSchema } from "../schemas/WorkoutLogSchema";

export const WorkoutLogModel = model<IWorkoutLogDocument>("WorkoutLog", WorkoutLogSchema); 