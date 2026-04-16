
import { SuperAdminProfileDTO } from "../../dtos/superAd-profile/SuperAdminProfileDTO";

export interface IUpdateSuperAdminProfileUseCase {
    execute(id: string, profile: SuperAdminProfileDTO): Promise<SuperAdminProfileDTO>;
}