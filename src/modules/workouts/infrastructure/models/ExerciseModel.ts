import { model } from "mongoose";
import { ExerciseSchema } from "../../../../shared/database/mongoose/schemas/ExerciseSchema";
import { IExerciseDocument } from "../../../../shared/database/mongoose/types/IExerciseDocument";

export const ExerciseModel = model<IExerciseDocument>("Exercise", ExerciseSchema);
