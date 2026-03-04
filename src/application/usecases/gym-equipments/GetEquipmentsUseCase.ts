import { IGetEquipmentsUseCase } from "../../IUseCases/gym-equipment/IGetEquipmentsUseCase";
import { IEquipmentRepository } from "../../../domain/repositories/IEquipmentRepository";
import { EquipmentDTO } from "../../dtos/gym-equipment/EquipmentDTO";
import { EquipmentMapper } from "../../mapper/EquipmentMapper";


export class GetEquipmentsUseCase implements IGetEquipmentsUseCase {
    constructor(private equipmentRepository: IEquipmentRepository) { }

    async execute(gymId: string, page: number, search?: string): Promise<{ equipments: EquipmentDTO[], total: number }> {
        const limit = 10;
        const result = await this.equipmentRepository.findAllByGym(gymId, page, limit, search);

        return {
            equipments: result.equipments.map(EquipmentMapper.toDTO),
            total: result.total
        };
    }
}
