import { SuperAdminProfileDTO } from "../dtos/SuperAdminProfileDTO"

export interface IGetSuperAdminProfileUseCase {
    execute(id: string): Promise<SuperAdminProfileDTO>;
}