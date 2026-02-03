import { model } from "mongoose";
import { SuperAdminSchema } from "../schemas/SuperAdminSchema";
import { ISuperAdminDocument } from "../types/ISuperAdminDocument";

export const SuperAdminModel = model<ISuperAdminDocument>("SuperAdmin", SuperAdminSchema); 