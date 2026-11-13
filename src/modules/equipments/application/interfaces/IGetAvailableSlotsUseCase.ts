import {SlotInfo} from "../dtos/EquipmentDTO";

export interface IGetAvailableSlotsUseCase {
    execute(equipmentId: string, date: Date): Promise<SlotInfo[]>;
}
