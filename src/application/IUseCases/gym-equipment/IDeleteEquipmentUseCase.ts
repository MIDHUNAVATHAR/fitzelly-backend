export interface IDeleteEquipmentUseCase {
    execute(id: string, gymId: string): Promise<void>;
}
