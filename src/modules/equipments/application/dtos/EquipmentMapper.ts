import { Equipment } from "../../domain/entities/Equipment";
import { EquipmentDTO } from "./EquipmentDTO";


export class EquipmentMapper {
    static toDTO(equipment: Equipment): EquipmentDTO {
        return {
            id: equipment.id,
            gymId: equipment.gymId,
            name: equipment.name,
            description: equipment.description,
            image: equipment.image,
            availableDays: equipment.availableDays,
            availableFrom: equipment.availableFrom,
            availableTo: equipment.availableTo,
            allowedPlans: equipment.allowedPlans,
            capacity: equipment.capacity,
            slotIntervalMinutes: equipment.slotIntervalMinutes,
            isActive: equipment.isActive
        };
    }
}
