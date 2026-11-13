import { model } from "mongoose";
import { WorkoutTemplateSchema } from "../../../../shared/database/mongoose/schemas/WorkoutTemplateSchema";
import { IWorkoutTemplateDocument } from "../../../../shared/database/mongoose/types/IWorkoutTemplateDocument";

export const WorkoutTemplateModel = model<IWorkoutTemplateDocument>("WorkoutTemplate", WorkoutTemplateSchema);
