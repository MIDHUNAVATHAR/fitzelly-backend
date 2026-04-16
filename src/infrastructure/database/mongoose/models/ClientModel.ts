import { model } from "mongoose";
import { ClientSchema } from "../schemas/ClientSchema";
import { IClientDocument } from "../types/IClientDocument";


export const clientModel = model<IClientDocument>("Client", ClientSchema); 