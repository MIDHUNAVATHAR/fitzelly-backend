import { IGymDocument } from "../database/mongoose/types/IGymDocument";
import { Gym } from "../../domain/entities/Gym";

export class GymMapper {
    static toEntity(doc: IGymDocument): Gym {
        return new Gym(
            doc._id.toString(),
            doc.email,
            doc.password,
            doc.role,
            doc.logoUrl,
            doc.gymName,
            doc.caption,
            doc.phoneNumber,
            doc.address,
            doc.description,
            doc.location,
            doc.approvalStatus,
            doc.expiryDate,
            doc.rejectionReason,
            doc.certificates,
            doc.createdAt,
        )
    }

    static toDocument(entity: Gym): Partial<IGymDocument> {
        return {
            email: entity.email,
            password: entity.password,
            role: entity.role,
            logoUrl: entity.logoUrl,
            gymName: entity.gymName,
            caption: entity.caption,
            phoneNumber: entity.phoneNumber,
            address: entity.address,
            description: entity.description,
            location: entity.location,
            approvalStatus: entity.approvalStatus,
            expiryDate: entity.expiryDate,
            rejectionReason: entity.rejectionReason,
            certificates: entity.certificates
        }
    }
}


