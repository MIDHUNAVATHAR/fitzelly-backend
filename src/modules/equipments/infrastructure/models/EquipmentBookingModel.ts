import { model } from "mongoose";
import { IEquipmentBooking } from "../../../../shared/database/mongoose/types/IEquipmentBooking";
import { equipmentBookingSchema } from "../../../../shared/database/mongoose/schemas/EquipmentBookingSchema";

export const EquipmentBookingModel = model<IEquipmentBooking>("EquipmentBooking", equipmentBookingSchema);
