import { model } from "mongoose";
import { ITrainerDocument } from "../types/ITrainerDocument";
import { TrainerSchema } from "../schemas/TrainerSchema";

export const TrainerModel = model<ITrainerDocument>(
    "trainer",
    TrainerSchema
)