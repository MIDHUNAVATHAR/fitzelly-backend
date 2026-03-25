import { model } from "mongoose";
import { ITrainerPayoutDocument } from "../types/ITrainerPayoutDocument";
import { TrainerPayoutSchema } from "../schemas/TrainerPayoutSchema";

export const TrainerPayoutModel = model<ITrainerPayoutDocument>("TrainerPayout", TrainerPayoutSchema);
