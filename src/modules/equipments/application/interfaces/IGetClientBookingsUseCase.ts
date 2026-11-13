import { EquipmentBookingDTO } from "../dtos/EquipmentBookingDto";

export interface IGetClientBookingsUseCase {
    execute(clientId: string): Promise<EquipmentBookingDTO[]>;
}
