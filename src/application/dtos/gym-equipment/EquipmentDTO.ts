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


export interface CreateBookingRequest {
    clientId: string;
    gymId: string;
    equipmentId: string;
    date: Date;
    startTime: string;
}

export interface SlotInfo {
    startTime: string;
    endTime: string;
    capacity: number;
    bookedCount: number;
    isAvailable: boolean;
}