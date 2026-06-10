import { IEquipmentBookingRepository } from "../../../domain/repositories/IEquipmentBookingRepository";
import { IGetClientBookingsUseCase } from "../../IUseCases/equipment-booking/IGetClientBookingsUseCase";
import { EquipmentBookingDTO, EquipmentBookingMapper } from "../../mapper/EquipmentBookingMapper";

export class GetClientBookingsUseCase implements IGetClientBookingsUseCase {
    constructor(private _equipmentBookingRepo: IEquipmentBookingRepository) { }

    async execute(clientId: string): Promise<EquipmentBookingDTO[]> {
        const bookings = await this._equipmentBookingRepo.findByClientId(clientId);
        return EquipmentBookingMapper.toDTOs(bookings);
    }
}