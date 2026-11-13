import { IEquipmentBookingRepository } from "../../domain/repositories/IEquipmentBookingRepository";
import { IGetClientBookingsUseCase } from "../interfaces/IGetClientBookingsUseCase";
import {  EquipmentBookingMapper } from "../dtos/EquipmentBookingMapper";
import { EquipmentBookingDTO } from "../dtos/EquipmentBookingDto";


export class GetClientBookingsUseCase implements IGetClientBookingsUseCase {
    constructor(private _equipmentBookingRepo: IEquipmentBookingRepository) { }

    async execute(clientId: string): Promise<EquipmentBookingDTO[]> {
        const bookings = await this._equipmentBookingRepo.findByClientId(clientId);
        return EquipmentBookingMapper.toDTOs(bookings);
    }
}