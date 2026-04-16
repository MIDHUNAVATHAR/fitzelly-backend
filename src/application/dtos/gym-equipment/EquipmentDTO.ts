export interface EquipmentDTO {
    id: string;
    gymId: string;
    name: string;
    description: string;
    image: string;
    availableDays: string[];
    availableFrom: string;
    availableTo: string;
    allowedPlans: string[];
    capacity: number;
    slotIntervalMinutes: number;
    isActive: boolean;
}

export interface CreateEquipmentDTO {
    gymId: string;
    name: string;
    description?: string;
    availableDays: string[];
    availableFrom: string;
    availableTo: string;
    allowedPlans: string[];
    capacity: number;
    slotIntervalMinutes: number;
    isActive?: boolean;
}

export interface UpdateEquipmentDTO extends Partial<CreateEquipmentDTO> {
    id: string;
}
