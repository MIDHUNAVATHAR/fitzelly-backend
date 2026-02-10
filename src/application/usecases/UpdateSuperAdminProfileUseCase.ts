import { SuperAdminProfileDTO } from "../dtos/SuperAdminProfileDTO";
import { IUpdateSuperAdminProfileUseCase } from "../IUseCases/IUpdateSuperAdminProfileUseCase";
import { ISuperAdminRepository } from "../../domain/repositories/ISuperAdminRepository";
import { SuperAdminProfileMapper } from "../mappers/SuperAdminProfileMapper";



export class UpdateSuperAdminProfileUseCase implements IUpdateSuperAdminProfileUseCase {
    constructor(
        private _superAdminRepository: ISuperAdminRepository
    ) { }
    async execute(id: string, profile: SuperAdminProfileDTO): Promise<SuperAdminProfileDTO> {
        const superAdminEntity = SuperAdminProfileMapper.toEntity(profile)
        const updatedSuperAdmin = await this._superAdminRepository.update(id, superAdminEntity);
        return SuperAdminProfileMapper.toDTO(updatedSuperAdmin);
    }
}