import mongoose from "mongoose";
import { IEquipment } from "../../../../shared/database/mongoose/types/IEquipment";
import {  equipmentSchema } from "../../../../shared/database/mongoose/schemas/EquipmentSchema";

export const EquipmentModel = mongoose.model<IEquipment>("Equipment", equipmentSchema);