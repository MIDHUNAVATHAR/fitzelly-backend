import { SuperAdmin } from "../entities/SuperAdmin";
import { IBaseRepository } from "./IBaseRepository";


export interface ISuperAdminRepository extends IBaseRepository<SuperAdmin> {
    findByEmail(email: string): Promise<SuperAdmin | null>;
    updatePassword(email: string, password: string): Promise<void>;
    updateById(id: string, superAdminData: SuperAdmin): Promise<SuperAdmin>;
    updateLogo(id: string, logoUrl: string): Promise<string>;
    getAdminConfig(): Promise<SuperAdmin | null>;
}