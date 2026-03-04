import mongoose from "mongoose";
import { IEquipment } from "../types/IEquipment";
import {  equipmentSchema } from "../schemas/EquipmentSchema";

export const EquipmentModel = mongoose.model<IEquipment>("Equipment", equipmentSchema);