import { IUpdateEquipmentUseCase } from "../../IUseCases/gym-equipment/IUpdateEquipmentUseCase";
import { IEquipmentRepository } from "../../../domain/repositories/IEquipmentRepository";
import { UpdateEquipmentDTO, EquipmentDTO } from "../../dtos/gym-equipment/EquipmentDTO";
import { IS3Service, IS3UploadFile } from "../../../domain/services/IS3Service";
import { EquipmentMapper } from "../../mapper/EquipmentMapper";



export class UpdateEquipmentUseCase implements IUpdateEquipmentUseCase {
    constructor(
        private equipmentRepository: IEquipmentRepository,
        private s3Service: IS3Service
    ) { }

    async execute(data: UpdateEquipmentDTO, file?: IS3UploadFile): Promise<EquipmentDTO> {
        const equipment = await this.equipmentRepository.findById(data.id);

        if (!equipment || equipment.gymId !== data.gymId) {
            throw new Error("Equipment not found or unauthorized");
        }

        let imageUrl = equipment.image;
        if (file) {
            imageUrl = await this.s3Service.uploadFile(file, `equipments/${data.gymId}`);
            /**
             * delete old image from s3
             */
            if (equipment.image) {
                await this.s3Service.deleteFile(equipment.image).catch(err => console.error("Error deleting old image:", err));
            }
        }

        equipment.update({
            name: data.name,
            description: data.description,
            image: imageUrl,
            availableDays: data.availableDays,
            availableFrom: data.availableFrom,
            availableTo: data.availableTo,
            allowedPlans: data.allowedPlans,
            capacity: data.capacity,
            slotIntervalMinutes: data.slotIntervalMinutes,
            isActive: data.isActive
        });

        const updatedEquipment = await this.equipmentRepository.save(equipment);
        return EquipmentMapper.toDTO(updatedEquipment);
    }
}
