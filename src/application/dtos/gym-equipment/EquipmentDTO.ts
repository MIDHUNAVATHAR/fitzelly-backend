export interface EquipmentDTO {
    id: string;
    gymId: string;
    name: string;
    description: string;
    image: string;
    startBookingTime: number;
    availableDays: string[];
    availableFrom: string;
    availableTo: string;
    allowedPlans: string[];
    maxUsageMinutes: number;
    capacity: number;
    slotIntervalMinutes: number;
    isActive: boolean;
}

export interface CreateEquipmentDTO {
    gymId: string;
    name: string;
    description?: string;
    startBookingTime: number;
    availableDays: string[];
    availableFrom: string;
    availableTo: string;
    allowedPlans: string[];
    maxUsageMinutes: number;
    capacity: number;
    slotIntervalMinutes: number;
    isActive?: boolean;
}

export interface UpdateEquipmentDTO extends Partial<CreateEquipmentDTO> {
    id: string;
}
