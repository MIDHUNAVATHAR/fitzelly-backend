import { IGetAvailableSlotsUseCase } from "./IGetAvailableSlotsUseCase";
import {SlotInfo} from "../../dtos/gym-equipment/EquipmentDTO";
import { IEquipmentRepository } from "../../../domain/repositories/IEquipmentRepository";
import { IEquipmentBookingRepository } from "../../../domain/repositories/IEquipmentBookingRepository";

export class GetAvailableSlotsUseCase implements IGetAvailableSlotsUseCase {
    constructor(
        private _equipmentRepo: IEquipmentRepository,
        private _equipmentBookingRepo: IEquipmentBookingRepository
    ) { }

    async execute(equipmentId: string, date: Date): Promise<SlotInfo[]> {
        const equipment = await this._equipmentRepo.findById(equipmentId);
        if (!equipment) throw new Error("Equipment not found.");

        const bookingDate = new Date(new Date(date).toISOString().split('T')[0]);
        bookingDate.setUTCHours(0, 0, 0, 0);

        // Check if building allowed for this day
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = dayNames[bookingDate.getDay()];
        if (!equipment.availableDays.includes(dayName)) {
            return [];
        }

        const slots: SlotInfo[] = [];
        const [startH, startM] = equipment.availableFrom.split(':').map(Number);
        const [endH, endM] = equipment.availableTo.split(':').map(Number);

        const startTimeMinutes = startH * 60 + startM;
        const endTimeMinutes = endH * 60 + endM;

        // Fetch all bookings for this date and equipment to check availability
        const currentBookings = await this._equipmentBookingRepo.findByEquipmentIdAndDate(equipmentId, bookingDate);

        for (let time = startTimeMinutes; time + equipment.slotIntervalMinutes <= endTimeMinutes; time += equipment.slotIntervalMinutes) {
            const h = Math.floor(time / 60);
            const m = time % 60;
            const startStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

            const endMinutes = time + equipment.slotIntervalMinutes;
            const eh = Math.floor(endMinutes / 60);
            const em = endMinutes % 60;
            const endStr = `${eh.toString().padStart(2, '0')}:${em.toString().padStart(2, '0')}`;

            // Count bookings that overlap with this slot [startStr, endStr]
            const bookedCount = currentBookings.filter(b => b.startTime === startStr).length;

            slots.push({
                startTime: startStr,
                endTime: endStr,
                capacity: equipment.capacity,
                bookedCount,
                isAvailable: bookedCount < equipment.capacity
            });
        }

        return slots;
    }
}
