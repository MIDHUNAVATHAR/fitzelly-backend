import { EquipmentDTO } from "../../dtos/gym-equipment/EquipmentDTO";

export interface IGetEquipmentsUseCase {
    execute(gymId: string, page: number, search?: string): Promise<{ equipments: EquipmentDTO[], total: number }>;
}
