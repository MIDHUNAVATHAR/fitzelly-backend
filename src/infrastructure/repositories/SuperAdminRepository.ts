import { ISuperAdminRepository } from "../../domain/repositories/ISuperAdminRepository";
import { BaseRepositoryImpl } from "./BaseRepositoryImpl";
import { SuperAdmin } from "../../domain/entities/SuperAdmin";
import { SuperAdminModel } from "../database/mongoose/models/SuperAdminModel";
import { ISuperAdminDocument } from "../database/mongoose/types/ISuperAdminDocument";


export class SuperAdminRepositoryImpl extends BaseRepositoryImpl<SuperAdmin, ISuperAdminDocument> implements ISuperAdminRepository {
    constructor() {
        super(SuperAdminModel)
    };

    protected toEntity(doc: ISuperAdminDocument): SuperAdmin {
        return new SuperAdmin(
            doc._id.toString(),
            doc.email,
            doc.password,
            doc.role
        )
    }
    protected toDocument(entity: SuperAdmin): Partial<ISuperAdminDocument> {
        return {
            email: entity.email,
            password: entity.password,
            role: entity.role
        }
    }

    async findByEmail(email: string): Promise<SuperAdmin | null> {
        const superAdminDoc = await this.model.findOne({ email });
        if (!superAdminDoc) return null;

        return this.toEntity(superAdminDoc);
    }

    async updatePassword(email: string, password: string): Promise<void> {
        await this.model.findOneAndUpdate({ email }, { password });
    }

}