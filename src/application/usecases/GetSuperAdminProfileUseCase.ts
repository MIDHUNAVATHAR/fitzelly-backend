import { SuperAdminProfileDTO } from "../dtos/SuperAdminProfileDTO";
import { IGetSuperAdminProfileUseCase } from "../IUseCases/IGetSuperAdminProfileUseCase";
import { ISuperAdminRepository } from "../../domain/repositories/ISuperAdminRepository";
import { SuperAdminProfileMapper } from "../mappers/SuperAdminProfileMapper";
import { NotFoundError } from "../errors/AppError";
import { logger } from "../../infrastructure/logger/logger";



export class GetSuperAdminProfileUseCase implements IGetSuperAdminProfileUseCase {
    constructor(private _superAdminRepository: ISuperAdminRepository) { }

    async execute(id: string): Promise<SuperAdminProfileDTO> {
        const superAdmin = await this._superAdminRepository.findById(id);
        logger.debug(superAdmin)
        if (!superAdmin) {
            throw new NotFoundError("super-admin")
        }
        return SuperAdminProfileMapper.toDTO(superAdmin);
    }
}