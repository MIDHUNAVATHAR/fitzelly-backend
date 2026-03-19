import { Enquiry } from "../../domain/entities/Enquiry";
import { IEnquiryDocument } from "../database/mongoose/types/IEnquiryDocument";

export class EnquiryMapper {
    static toEntity(doc: IEnquiryDocument): Enquiry {
        return new Enquiry(
            doc._id.toString(),
            doc.gymId,
            doc.fullName,
            doc.phoneNumber,
            doc.email,
            doc.status,
            doc.date,
            doc.isDeleted
        );
    }

    static toDocument(entity: Enquiry): Partial<IEnquiryDocument> {
        return {
            gymId: entity.gymId,
            fullName: entity.fullName,
            phoneNumber: entity.phoneNumber,
            email: entity.email,
            status: entity.status,
            date: entity.date,
            isDeleted: entity.isDeleted
        };
    }
}
