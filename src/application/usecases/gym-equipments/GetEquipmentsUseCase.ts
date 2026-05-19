import { IGetEquipmentsUseCase } from "../../IUseCases/gym-equipment/IGetEquipmentsUseCase";
import { IEquipmentRepository } from "../../../domain/repositories/IEquipmentRepository";
import { EquipmentDTO } from "../../dtos/gym-equipment/EquipmentDTO";
import { EquipmentMapper } from "../../mapper/EquipmentMapper";


export class GetEquipmentsUseCase implements IGetEquipmentsUseCase {
    constructor(private _equipmentRepository: IEquipmentRepository) { }

    async execute(gymId: string, page: number, limit: number, search?: string): Promise<{ equipments: EquipmentDTO[], total: number }> {
        const result = await this._equipmentRepository.findAllByGym(gymId, page, limit, search);

        return {
            equipments: result.equipments.map(EquipmentMapper.toDTO),
            total: result.total
        };
    }
}
