import { EquipmentBooking } from "../../../domain/entities/EquipmentBooking";
import { IEquipmentBookingRepository } from "../../../domain/repositories/IEquipmentBookingRepository";
import { IGetClientBookingsUseCase } from "./IGetClientBookingsUseCase";

export class GetClientBookingsUseCase implements IGetClientBookingsUseCase {
    constructor(private _equipmentBookingRepo: IEquipmentBookingRepository) { }

    async execute(clientId: string): Promise<EquipmentBooking[]> {
        return await this._equipmentBookingRepo.findByClientId(clientId);
    }
}
