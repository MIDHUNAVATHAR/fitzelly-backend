import {CreateBookingRequest} from "../dtos/EquipmentDTO";
import { EquipmentBookingDTO } from "../dtos/EquipmentBookingDto";


export interface ICreateEquipmentBookingUseCase {
    execute(request: CreateBookingRequest): Promise<EquipmentBookingDTO>;
}
