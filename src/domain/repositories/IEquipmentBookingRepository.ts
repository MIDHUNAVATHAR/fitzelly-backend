import { EquipmentBooking } from "../entities/EquipmentBooking";

export interface IEquipmentBookingRepository {
    create(booking: EquipmentBooking): Promise<EquipmentBooking>;
    findById(id: string): Promise<EquipmentBooking | null>;
    findByClientId(clientId: string): Promise<EquipmentBooking[]>;
    findByEquipmentIdAndDate(equipmentId: string, date: Date): Promise<EquipmentBooking[]>;
    cancel(id: string): Promise<void>;
    countBySlot(equipmentId: string, date: Date, startTime: string): Promise<number>;
    countByClientAndDate(clientId: string, date: Date): Promise<number>;
}
