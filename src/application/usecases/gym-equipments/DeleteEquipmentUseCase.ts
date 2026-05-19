import { IDeleteEquipmentUseCase } from "../../IUseCases/gym-equipment/IDeleteEquipmentUseCase";
import { IEquipmentRepository } from "../../../domain/repositories/IEquipmentRepository";

export class DeleteEquipmentUseCase implements IDeleteEquipmentUseCase {
    constructor(private _equipmentRepository: IEquipmentRepository) { }

    async execute(id: string, gymId: string): Promise<void> {
        const equipment = await this._equipmentRepository.findById(id);

        if (!equipment || equipment.gymId !== gymId) {
            throw new Error("Equipment not found or unauthorized");
        }

        equipment.delete();
        await this._equipmentRepository.save(equipment);
    }
}
