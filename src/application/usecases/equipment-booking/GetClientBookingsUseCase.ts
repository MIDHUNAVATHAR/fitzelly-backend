import { EquipmentBooking } from "../../../domain/entities/EquipmentBooking";
import { IEquipmentBookingRepository } from "../../../domain/repositories/IEquipmentBookingRepository";
import { IGetClientBookingsUseCase } from "./IGetClientBookingsUseCase";

export class GetClientBookingsUseCase implements IGetClientBookingsUseCase {
    constructor(private equipmentBookingRepo: IEquipmentBookingRepository) { }

    async execute(clientId: string): Promise<EquipmentBooking[]> {
        return await this.equipmentBookingRepo.findByClientId(clientId);
    }
}
