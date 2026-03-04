import { CreateEquipmentDTO,EquipmentDTO } from "../../dtos/gym-equipment/EquipmentDTO";
import { IS3UploadFile } from "../../../domain/services/IS3Service";

export interface IAddEquipmentUseCase {
    execute(data: CreateEquipmentDTO, file?: IS3UploadFile): Promise<EquipmentDTO>;
}
