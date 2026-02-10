import { IS3UploadFile } from "../../domain/services/IS3Service";

export interface IUpdateSuperAdminLogoUseCase {
    execute(id: string, logo:IS3UploadFile): Promise<string>;
}