import { Equipment } from "../entities/Equipment";

export interface IEquipmentRepository {
    save(equipment: Equipment): Promise<Equipment>;
    findById(id: string): Promise<Equipment | null>;
    findAllByGym(gymId: string, page: number, limit: number, search?: string): Promise<{
        equipments: Equipment[],
        total:number
    }>
}