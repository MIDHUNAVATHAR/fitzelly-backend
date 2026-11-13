import { IS3UploadFile } from "../../../../shared/services/IS3Service";

export interface IUpdateSuperAdminLogoUseCase {
    execute(id: string, logo: IS3UploadFile): Promise<string>;
}