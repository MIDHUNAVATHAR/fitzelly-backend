import { SuperAdmin } from "../entities/SuperAdmin";
import { IBaseRepository } from "./IBaseRepository";

export interface ISuperAdminRepository extends IBaseRepository<SuperAdmin> {
    findByEmail(email: string): Promise<SuperAdmin | null>;
    updatePassword(email: string, password: string): Promise<void>;
}