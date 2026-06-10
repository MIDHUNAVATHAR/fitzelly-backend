import { EquipmentBookingDTO } from "../../mapper/EquipmentBookingMapper";

export interface IGetClientBookingsUseCase {
    execute(clientId: string): Promise<EquipmentBookingDTO[]>;
}
