import { model } from "mongoose";
import { IEquipmentBooking } from "../types/IEquipmentBooking";
import { equipmentBookingSchema } from "../schemas/EquipmentBookingSchema";

export const EquipmentBookingModel = model<IEquipmentBooking>("EquipmentBooking", equipmentBookingSchema);
