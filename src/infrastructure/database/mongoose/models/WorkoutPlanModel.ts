import { model } from "mongoose";
import { IWorkoutPlanDocument } from "../types/IWorkoutPlanDocument";
import { WorkoutPlanSchema } from "../schemas/WorkoutPlanSchema";

export const WorkoutPlanModel = model<IWorkoutPlanDocument>("WorkoutPlan", WorkoutPlanSchema); 