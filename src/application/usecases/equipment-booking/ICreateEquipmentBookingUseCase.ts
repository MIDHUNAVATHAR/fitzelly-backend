import { EquipmentBooking } from "../../../domain/entities/EquipmentBooking";
import {CreateBookingRequest} from "../../dtos/gym-equipment/EquipmentDTO";



export interface ICreateEquipmentBookingUseCase {
    execute(request: CreateBookingRequest): Promise<EquipmentBooking>;
}
