import { model } from "mongoose";
import { IWorkoutPlanDocument } from "../../../../shared/database/mongoose/types/IWorkoutPlanDocument";
import { WorkoutPlanSchema } from "../../../../shared/database/mongoose/schemas/WorkoutPlanSchema";

export const WorkoutPlanModel = model<IWorkoutPlanDocument>("WorkoutPlan", WorkoutPlanSchema); 