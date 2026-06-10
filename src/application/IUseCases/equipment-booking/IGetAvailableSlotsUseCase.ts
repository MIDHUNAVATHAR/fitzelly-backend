import {SlotInfo} from "../../dtos/gym-equipment/EquipmentDTO";

export interface IGetAvailableSlotsUseCase {
    execute(equipmentId: string, date: Date): Promise<SlotInfo[]>;
}
