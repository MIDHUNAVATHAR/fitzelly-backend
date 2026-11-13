import { model } from "mongoose";
import { ClientSchema } from "../../../../shared/database/mongoose/schemas/ClientSchema";
import { IClientDocument } from "../../../../shared/database/mongoose/types/IClientDocument";


export const clientModel = model<IClientDocument>("Client", ClientSchema); 