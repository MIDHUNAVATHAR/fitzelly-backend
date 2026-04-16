import { SuperAdminProfileDTO } from "../../dtos/superAd-profile/SuperAdminProfileDTO"

export interface IGetSuperAdminProfileUseCase {
    execute(id: string): Promise<SuperAdminProfileDTO>;
}