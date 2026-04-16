import { IAddEquipmentUseCase } from "../../IUseCases/gym-equipment/IAddEquipmentUseCase";
import { IEquipmentRepository } from "../../../domain/repositories/IEquipmentRepository";
import { CreateEquipmentDTO, EquipmentDTO } from "../../dtos/gym-equipment/EquipmentDTO";
import { Equipment } from "../../../domain/entities/Equipment";
import { EquipmentMapper } from "../../mapper/EquipmentMapper";
import { IS3Service, IS3UploadFile } from "../../../domain/services/IS3Service";
import { BadRequestError } from "../../errors/AppError";

export class AddEquipmentUseCase implements IAddEquipmentUseCase {
    constructor(
        private equipmentRepository: IEquipmentRepository,
        private s3Service: IS3Service
    ) { }

    async execute(data: CreateEquipmentDTO, file?: IS3UploadFile): Promise<EquipmentDTO> {
        const existingEquipment = await this.equipmentRepository.findByName(data.gymId, data.name);

        if (existingEquipment) {
            throw new BadRequestError("Equipment with this name already exists in your gym");
        }

        let imageUrl = "";

        if (file) {
            imageUrl = await this.s3Service.uploadFile(file, `equipments/${data.gymId}`);
        }

        const equipment = new Equipment(
            "",
            data.gymId,
            data.name,
            data.description || "",
            imageUrl,
            data.availableDays,
            data.availableFrom,
            data.availableTo,
            data.allowedPlans,
            data.capacity,
            data.slotIntervalMinutes,
            data.isActive !== undefined ? data.isActive : true,
            false
        );

        const createdEquipment = await this.equipmentRepository.save(equipment);
        return EquipmentMapper.toDTO(createdEquipment);
    }
}
