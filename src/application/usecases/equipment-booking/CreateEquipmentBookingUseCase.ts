import { EquipmentBooking } from "../../../domain/entities/EquipmentBooking";
import { IEquipmentBookingRepository } from "../../../domain/repositories/IEquipmentBookingRepository";
import { IEquipmentRepository } from "../../../domain/repositories/IEquipmentRepository";
import { ICreateEquipmentBookingUseCase, CreateBookingRequest } from "./ICreateEquipmentBookingUseCase";
import { BadRequestError, NotFoundError } from "../../errors/AppError";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { AddNotificationUseCase } from "../notification/NotificationUseCases";

export class CreateEquipmentBookingUseCase implements ICreateEquipmentBookingUseCase {
    constructor(
        private equipmentBookingRepo: IEquipmentBookingRepository,
        private equipmentRepo: IEquipmentRepository,
        private clientRepo: IClientRepository,
        private addNotificationUseCase: AddNotificationUseCase
    ) { }

    async execute(request: CreateBookingRequest): Promise<EquipmentBooking> {
        const { clientId, gymId, equipmentId, date, startTime } = request;

        // 1. Check if date is tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowISO = tomorrow.toISOString().split('T')[0];

        const bookingDate = new Date(date);
        const bookingISO = bookingDate.toISOString().split('T')[0];

        if (bookingISO !== tomorrowISO) {
            throw new BadRequestError("You can only book for tomorrow.");
        }

        // Use bookingDate normalized to UTC midnight for comparisons and storage
        const normalizedDate = new Date(bookingISO);
        normalizedDate.setUTCHours(0, 0, 0, 0);

        // 1.5. Check if client already booked for this day (Limit to 3)
        const clientBookingCount = await this.equipmentBookingRepo.countByClientAndDate(clientId, normalizedDate);
        if (clientBookingCount >= 3) {
            throw new BadRequestError("Exceed limit booking per equipment (Max 3)");
        }

        // 2. Fetch Equipment
        const equipment = await this.equipmentRepo.findById(equipmentId);
        if (!equipment) throw new NotFoundError("Equipment");

        // 3. Check available days
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const bookingDayName = dayNames[bookingDate.getDay()];
        if (!equipment.availableDays.includes(bookingDayName)) {
            throw new BadRequestError(`Booking not available on ${bookingDayName}.`);
        }

        // 4. Check if startTime is within range
        const [h, m] = startTime.split(':').map(Number);
        const startTimeMinutes = h * 60 + m;
        const endTimeMinutes = startTimeMinutes + equipment.slotIntervalMinutes;

        const [startH, startM] = equipment.availableFrom.split(':').map(Number);
        const [endH, endM] = equipment.availableTo.split(':').map(Number);
        const availableFromMin = startH * 60 + startM;
        const availableToMin = endH * 60 + endM;

        if (startTimeMinutes < availableFromMin || endTimeMinutes > availableToMin) {
            throw new BadRequestError(`Booking must be between ${equipment.availableFrom} and ${equipment.availableTo}.`);
        }

        // 5. Check Capacity
        const bookedCount = await this.equipmentBookingRepo.countBySlot(equipmentId, normalizedDate, startTime);
        if (bookedCount >= equipment.capacity) {
            throw new BadRequestError("This slot is already full.");
        }

        // 6. Calculate endTime string
        const eh = Math.floor(endTimeMinutes / 60);
        const em = endTimeMinutes % 60;
        const endTime = `${eh.toString().padStart(2, '0')}:${em.toString().padStart(2, '0')}`;

        // 7. Create
        const booking = new EquipmentBooking(
            "",
            clientId,
            gymId,
            equipmentId,
            normalizedDate,
            startTime,
            endTime
        );

        const createdBooking = await this.equipmentBookingRepo.create(booking);

        const client = await this.clientRepo.findById(clientId);
        const clientName = client?.fullName || "A client";

        await this.addNotificationUseCase.execute(
            gymId,
            `${clientName} booked ${equipment.name} (${startTime} - ${endTime})`,
            "EQUIPMENT_BOOKING"
        );

        return createdBooking;
    }
}
