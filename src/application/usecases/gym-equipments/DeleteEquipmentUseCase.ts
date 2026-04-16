import { IDeleteEquipmentUseCase } from "../../IUseCases/gym-equipment/IDeleteEquipmentUseCase";
import { IEquipmentRepository } from "../../../domain/repositories/IEquipmentRepository";

export class DeleteEquipmentUseCase implements IDeleteEquipmentUseCase {
    constructor(private equipmentRepository: IEquipmentRepository) { }

    async execute(id: string, gymId: string): Promise<void> {
        const equipment = await this.equipmentRepository.findById(id);

        if (!equipment || equipment.gymId !== gymId) {
            throw new Error("Equipment not found or unauthorized");
        }

        equipment.delete();
        await this.equipmentRepository.save(equipment);
    }
}
