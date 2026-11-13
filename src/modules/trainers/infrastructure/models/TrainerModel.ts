import { model } from "mongoose";
import { ITrainerDocument } from "../../../../shared/database/mongoose/types/ITrainerDocument";
import { TrainerSchema } from "../../../../shared/database/mongoose/schemas/TrainerSchema";

export const TrainerModel = model<ITrainerDocument>(
    "trainer",
    TrainerSchema
)