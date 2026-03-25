import { model } from "mongoose";
import { WorkoutTemplateSchema } from "../schemas/WorkoutTemplateSchema";
import { IWorkoutTemplateDocument } from "../types/IWorkoutTemplateDocument";

export const WorkoutTemplateModel = model<IWorkoutTemplateDocument>("WorkoutTemplate", WorkoutTemplateSchema);
