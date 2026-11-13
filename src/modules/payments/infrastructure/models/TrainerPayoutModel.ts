import { model } from "mongoose";
import { ITrainerPayoutDocument } from "../../../../shared/database/mongoose/types/ITrainerPayoutDocument";
import { TrainerPayoutSchema } from "../../../../shared/database/mongoose/schemas/TrainerPayoutSchema";

export const TrainerPayoutModel = model<ITrainerPayoutDocument>("TrainerPayout", TrainerPayoutSchema);
