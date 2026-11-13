import { CreateEquipmentDTO,EquipmentDTO } from "../dtos/EquipmentDTO";
import { IS3UploadFile } from "../../../../shared/services/IS3Service";

export interface IAddEquipmentUseCase {
    execute(data: CreateEquipmentDTO, file?: IS3UploadFile): Promise<EquipmentDTO>;
}
