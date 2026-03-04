import { EquipmentDTO,UpdateEquipmentDTO } from "../../dtos/gym-equipment/EquipmentDTO";
import { IS3UploadFile } from "../../../domain/services/IS3Service";

export interface IUpdateEquipmentUseCase {
    execute(data: UpdateEquipmentDTO, file?: IS3UploadFile): Promise<EquipmentDTO>;
}
