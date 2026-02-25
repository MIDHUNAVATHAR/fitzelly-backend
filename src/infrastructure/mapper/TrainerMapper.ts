import { ITrainerDocument } from "../database/mongoose/types/ITrainerDocument";
import { Trainer } from "../../domain/entities/Trainer";
import { Types } from "mongoose";


export class TrainerMapper {
    static toEntity(doc: ITrainerDocument): Trainer {
        return new Trainer(
            doc._id.toString(),
            doc.gymId.toString(),
            doc.email,
            doc.password ?? null,
            doc.profileUrl ?? null,
            doc.fullName,
            doc.phoneNumber,
            doc.dateOfBirth ?? null,
            doc.salary?.toString() ?? null,
            doc.specialization,
            doc.isEmailVerified,
            doc.joinedDate,
            doc.isDeleted
        );
    }

    static toDocument(entity: Trainer): Partial<ITrainerDocument> {
        return {
            gymId: new Types.ObjectId(entity.gymId),
            email: entity.email,
            fullName: entity.fullName,
            phoneNumber: entity.phoneNumber,
            profileUrl: entity.profileUrl ?? "",
            dateOfBirth: entity.dateOfBirth ?? undefined,
            specialization: entity.specialization,
            salary: entity.salary ? Number(entity.salary) : 0,
            joinedDate: entity.joinedDate,
            isEmailVerified: entity.isEmailVerified,
            isDeleted: entity.isDeleted
        };
    }
}