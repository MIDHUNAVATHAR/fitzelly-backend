import { EquipmentBooking } from "../../domain/entities/EquipmentBooking";
import { EquipmentBookingDTO } from "./EquipmentBookingDto";


export class EquipmentBookingMapper {
    static toDTO(booking: EquipmentBooking): EquipmentBookingDTO {
        return {
            id: booking.id,
            clientId: booking.clientId,
            gymId: booking.gymId,
            equipmentId: booking.equipmentId,
            date: `${booking.date.getFullYear()}-${(booking.date.getMonth() + 1).toString().padStart(2, '0')}-${booking.date.getDate().toString().padStart(2, '0')}`,
            startTime: booking.startTime,
            endTime: booking.endTime,
            status: booking.status,
            createdAt: booking.createdAt.toISOString()
        };
    }

    static toDTOs(bookings: EquipmentBooking[]): EquipmentBookingDTO[] {
        return bookings.map(booking => this.toDTO(booking));
    }
}
