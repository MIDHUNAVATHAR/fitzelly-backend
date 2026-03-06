import { ISuperAdminDocument } from "../database/mongoose/types/ISuperAdminDocument";
import { SuperAdmin } from "../../domain/entities/SuperAdmin";

export class SuperAdminMapper {
    static toEntity(doc: ISuperAdminDocument): SuperAdmin {
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
            doc.description,
            doc.trialDays || 28
        )
    }

    static toDocument(entity: SuperAdmin): Partial<ISuperAdminDocument> {
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
        if (entity.trialDays !== undefined) doc.trialDays = entity.trialDays;

        return doc;
    }
}