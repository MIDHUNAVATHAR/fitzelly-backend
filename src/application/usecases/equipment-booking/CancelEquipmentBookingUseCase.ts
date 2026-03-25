import { IEquipmentBookingRepository } from "../../../domain/repositories/IEquipmentBookingRepository";

export interface ICancelEquipmentBookingUseCase {
    execute(bookingId: string, clientId: string): Promise<void>;
}

export class CancelEquipmentBookingUseCase implements ICancelEquipmentBookingUseCase {
    constructor(private equipmentBookingRepo: IEquipmentBookingRepository) { }

    async execute(bookingId: string, clientId: string): Promise<void> {
        const booking = await this.equipmentBookingRepo.findById(bookingId);
        if (!booking) {
            throw new Error("Booking not found");
        }

        if (booking.clientId !== clientId) {
            throw new Error("Unauthorized to cancel this booking");
        }

        if (booking.status === 'CANCELLED') {
            throw new Error("Booking is already cancelled");
        }

        // Optional: restriction like "cannot cancel if session already started or too close"
        
        await this.equipmentBookingRepo.cancel(bookingId);
    }
}
