
import { SuperAdminProfileDTO } from "../dtos/SuperAdminProfileDTO";

export interface IUpdateSuperAdminProfileUseCase {
    execute(id: string, profile: SuperAdminProfileDTO): Promise<SuperAdminProfileDTO>;
}