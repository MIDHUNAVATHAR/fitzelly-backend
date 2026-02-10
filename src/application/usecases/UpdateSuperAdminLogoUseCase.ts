import { ISuperAdminRepository } from "../../domain/repositories/ISuperAdminRepository";
import { IS3Service } from "../../domain/services/IS3Service";
import { IUpdateSuperAdminLogoUseCase } from "../IUseCases/IUpdateSuperAdminLogoUseCase";
import { IS3UploadFile } from "../../domain/services/IS3Service";


export class UpdateSuperAdminLogoUseCase implements IUpdateSuperAdminLogoUseCase {
    constructor(
        private _superAdminRepository: ISuperAdminRepository,
        private _s3Service: IS3Service
    ) { }
    async execute(id: string, logo:IS3UploadFile): Promise<string> {
        const superAdmin = await this._superAdminRepository.findById(id);
        const oldLogoUrl = superAdmin?.logoUrl;

        const newUrl = await this._s3Service.uploadFile(logo);

        const updatedUrl=  await this._superAdminRepository.updateLogo(id, newUrl);

        //delete old url from s3 bucket
        if(updatedUrl && oldLogoUrl){
            await this._s3Service.deleteFile(oldLogoUrl);
        }

        return updatedUrl;
    }
}