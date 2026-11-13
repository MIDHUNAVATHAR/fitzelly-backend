import { SuperAdmin } from "../../domain/entities/SuperAdmin";
import { IBaseRepository } from "../../../../shared/database/BaseRepository";


export interface ISuperAdminRepository extends IBaseRepository<SuperAdmin> {
    findByEmail(email: string): Promise<SuperAdmin | null>;
    updatePassword(email: string, password: string): Promise<void>;
    updateById(id: string, superAdminData: SuperAdmin): Promise<SuperAdmin>;
    updateLogo(id: string, logoUrl: string): Promise<string>;
    getAdminConfig(): Promise<SuperAdmin | null>;
}