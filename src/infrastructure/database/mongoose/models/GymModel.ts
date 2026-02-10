import { model } from "mongoose";
import { GymSchema } from "../schemas/GymSchema";
import { IGymDocument } from "../types/IGymDocument";


export const GymModel = model<IGymDocument>("Gym", GymSchema);