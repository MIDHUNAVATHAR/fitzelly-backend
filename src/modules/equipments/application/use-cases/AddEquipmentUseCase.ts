import { IAddEquipmentUseCase } from "../interfaces/IAddEquipmentUseCase";
import { IEquipmentRepository } from "../../domain/repositories/IEquipmentRepository";
import { CreateEquipmentDTO, EquipmentDTO } from "../dtos/EquipmentDTO";
import { Equipment } from "../../domain/entities/Equipment";
import { EquipmentMapper } from "../dtos/EquipmentMapper";
import { IS3Service, IS3UploadFile } from "../../../../shared/services/IS3Service";
import { BadRequestError } from "../../../../shared/errors/AppError";

export class AddEquipmentUseCase implements IAddEquipmentUseCase {
    constructor(
        private _equipmentRepository: IEquipmentRepository,
        private _s3Service: IS3Service
    ) { }

    async execute(data: CreateEquipmentDTO, file?: IS3UploadFile): Promise<EquipmentDTO> {
        const existingEquipment = await this._equipmentRepository.findByName(data.gymId, data.name);

        if (existingEquipment) {
            throw new BadRequestError("Equipment with this name already exists in your gym");
        }

        let imageUrl = "";

        if (file) {
            imageUrl = await this._s3Service.uploadFile(file, `equipments/${data.gymId}`);
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

        const createdEquipment = await this._equipmentRepository.save(equipment);
        return EquipmentMapper.toDTO(createdEquipment);
    }
}
