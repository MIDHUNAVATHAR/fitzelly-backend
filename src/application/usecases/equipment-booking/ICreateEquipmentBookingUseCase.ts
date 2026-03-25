import { EquipmentBooking } from "../../../domain/entities/EquipmentBooking";

export interface CreateBookingRequest {
    clientId: string;
    gymId: string;
    equipmentId: string;
    date: Date;
    startTime: string;
}

export interface ICreateEquipmentBookingUseCase {
    execute(request: CreateBookingRequest): Promise<EquipmentBooking>;
}
