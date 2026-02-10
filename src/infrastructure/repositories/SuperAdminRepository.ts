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
            doc.role,
            doc.logoUrl,
            doc.appName,
            doc.caption,
            doc.contactEmail,
            doc.phoneNumber,
            doc.description
        )
    }
    protected toDocument(entity: SuperAdmin): Partial<ISuperAdminDocument> {
        const doc: Partial<ISuperAdminDocument> = {};
        if (entity.email) doc.email = entity.email;
        if (entity.password) doc.password = entity.password;
        if (entity.role) doc.role = entity.role;
        if (entity.logoUrl) doc.logoUrl = entity.logoUrl;
        if (entity.appName) doc.appName = entity.appName;
        if (entity.caption) doc.caption = entity.caption;
        if (entity.contactEmail) doc.contactEmail = entity.contactEmail;
        if (entity.phoneNumber) doc.phoneNumber = entity.phoneNumber;
        if (entity.description) doc.description = entity.description;

        return doc;
    }

    async findByEmail(email: string): Promise<SuperAdmin | null> {
        const superAdminDoc = await this.model.findOne({ email });
        if (!superAdminDoc) return null;

        return this.toEntity(superAdminDoc);
    }

    async updatePassword(email: string, password: string): Promise<void> {
        await this.model.findOneAndUpdate({ email }, { password });
    }

    async update(id: string, superAdminData: SuperAdmin): Promise<SuperAdmin> {
        const superAdminDoc = this.toDocument(superAdminData)

        const updatedDoc = await this.model.findByIdAndUpdate(id, superAdminDoc, { new: true });
        if (!updatedDoc) {
            throw new Error("Superadmin not found");
        }
        return this.toEntity(updatedDoc);
    }

    async updateLogo(id: string, logoUrl: string): Promise<string> {
        const superAdminDoc = await this.model.findByIdAndUpdate(id, { logoUrl }, { new: true });
       
        if(!superAdminDoc){
            throw Error("Super admin not found");
        }
        return superAdminDoc?.logoUrl; 
    }

}