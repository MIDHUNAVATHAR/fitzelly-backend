import { SuperAdminProfileDTO } from "../../dtos/superAd-profile/SuperAdminProfileDTO";
import { IUpdateSuperAdminProfileUseCase } from "../../IUseCases/superAd-profile/IUpdateSuperAdminProfileUseCase";
import { ISuperAdminRepository } from "../../../domain/repositories/ISuperAdminRepository";
import { SuperAdminProfileMapper } from "../../mapper/SuperAdminProfileMapper";



export class UpdateSuperAdminProfileUseCase implements IUpdateSuperAdminProfileUseCase {
    constructor(
        private _superAdminRepository: ISuperAdminRepository
    ) { }
    async execute(id: string, profile: SuperAdminProfileDTO): Promise<SuperAdminProfileDTO> {
        const superAdminEntity = SuperAdminProfileMapper.toEntity(profile)
        const updatedSuperAdmin = await this._superAdminRepository.updateById(id, superAdminEntity);
        return SuperAdminProfileMapper.toDTO(updatedSuperAdmin);
    }
}