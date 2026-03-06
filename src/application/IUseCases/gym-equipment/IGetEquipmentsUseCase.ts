import { EquipmentDTO } from "../../dtos/gym-equipment/EquipmentDTO";

export interface IGetEquipmentsUseCase {
    execute(gymId: string, page: number, limit: number, search?: string):
        Promise<{ equipments: EquipmentDTO[], total: number }>;
}
