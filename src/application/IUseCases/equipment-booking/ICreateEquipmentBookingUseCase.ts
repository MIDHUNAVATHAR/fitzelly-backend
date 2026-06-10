import { EquipmentBookingDTO } from "../../mapper/EquipmentBookingMapper";
import {CreateBookingRequest} from "../../dtos/gym-equipment/EquipmentDTO";



export interface ICreateEquipmentBookingUseCase {
    execute(request: CreateBookingRequest): Promise<EquipmentBookingDTO>;
}
