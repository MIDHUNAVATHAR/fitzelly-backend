import { EquipmentBooking } from "../../../domain/entities/EquipmentBooking";

export interface IGetClientBookingsUseCase {
    execute(clientId: string): Promise<EquipmentBooking[]>;
}
