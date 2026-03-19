import { ISuperAdminRepository } from "../../domain/repositories/ISuperAdminRepository";
import { BaseRepository } from "./BaseRepository";
import { SuperAdmin } from "../../domain/entities/SuperAdmin";
import { SuperAdminModel } from "../database/mongoose/models/SuperAdminModel";
import { ISuperAdminDocument } from "../database/mongoose/types/ISuperAdminDocument";
import { SuperAdminMapper } from "../mapper/SuperAdminMapper";
import { NotFoundError } from "../../domain/errors/NotFoundError";


export class SuperAdminRepository extends BaseRepository<SuperAdmin, ISuperAdminDocument> implements ISuperAdminRepository {
    constructor() {
        super(SuperAdminModel)
    };

    protected toEntity(doc: ISuperAdminDocument): SuperAdmin {
        return SuperAdminMapper.toEntity(doc);
    }
    protected toDocument(entity: SuperAdmin): Partial<ISuperAdminDocument> {
        return SuperAdminMapper.toDocument(entity)
    }

    async findByEmail(email: string): Promise<SuperAdmin | null> {
        const superAdminDoc = await this.model.findOne({ email });
        if (!superAdminDoc) return null;

        return this.toEntity(superAdminDoc);
    }

    async updatePassword(email: string, password: string): Promise<void> {
        await this.model.findOneAndUpdate({ email }, { password });
    }

    async updateById(id: string, superAdminData: SuperAdmin): Promise<SuperAdmin> {
        const superAdminDoc = this.toDocument(superAdminData);

        const updatedDoc = await this.model.findByIdAndUpdate(id, superAdminDoc, { new: true });
        if (!updatedDoc) {
            throw new NotFoundError("SuperAdmin");
        }
        return this.toEntity(updatedDoc);
    }

    async updateLogo(id: string, logoUrl: string): Promise<string> {
        const superAdminDoc = await this.model.findByIdAndUpdate(id, { logoUrl }, { new: true });

        if (!superAdminDoc) {
            throw new NotFoundError("SuperAdmin");
        }
        return superAdminDoc?.logoUrl;
    }

    async getAdminConfig(): Promise<SuperAdmin | null> {
        const doc = await this.model.findOne();
        return doc ? this.toEntity(doc) : null;
    }

}