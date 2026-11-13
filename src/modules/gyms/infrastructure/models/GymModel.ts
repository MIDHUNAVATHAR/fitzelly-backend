import { model } from "mongoose";
import { GymSchema } from "../../../../shared/database/mongoose/schemas/GymSchema";
import { IGymDocument } from "../../../../shared/database/mongoose/types/IGymDocument";


export const GymModel = model<IGymDocument>("Gym", GymSchema);