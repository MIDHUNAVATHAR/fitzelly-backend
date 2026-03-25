import { model } from "mongoose";
import { ExerciseSchema } from "../schemas/ExerciseSchema";
import { IExerciseDocument } from "../types/IExerciseDocument";

export const ExerciseModel = model<IExerciseDocument>("Exercise", ExerciseSchema);
