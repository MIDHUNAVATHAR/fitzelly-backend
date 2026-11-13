import { EquipmentDTO,UpdateEquipmentDTO } from "../dtos/EquipmentDTO";
import { IS3UploadFile } from "../../../../shared/services/IS3Service";

export interface IUpdateEquipmentUseCase {
    execute(data: UpdateEquipmentDTO, file?: IS3UploadFile): Promise<EquipmentDTO>;
}
