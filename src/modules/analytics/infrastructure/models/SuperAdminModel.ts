import { model } from "mongoose";
import { SuperAdminSchema } from "../../../../shared/database/mongoose/schemas/SuperAdminSchema";
import { ISuperAdminDocument } from "../../../../shared/database/mongoose/types/ISuperAdminDocument";

export const SuperAdminModel = model<ISuperAdminDocument>("SuperAdmin", SuperAdminSchema); 