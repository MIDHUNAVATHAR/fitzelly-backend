export interface SlotInfo {
    startTime: string;
    endTime: string;
    capacity: number;
    bookedCount: number;
    isAvailable: boolean;
}

export interface IGetAvailableSlotsUseCase {
    execute(equipmentId: string, date: Date): Promise<SlotInfo[]>;
}
