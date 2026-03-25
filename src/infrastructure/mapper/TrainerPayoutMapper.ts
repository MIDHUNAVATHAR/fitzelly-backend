import { TrainerPayout } from "../../domain/entities/TrainerPayout";
import { ITrainerPayoutDocument } from "../database/mongoose/types/ITrainerPayoutDocument";

export class TrainerPayoutMapper {
    static toEntity(doc: ITrainerPayoutDocument): TrainerPayout {
        return new TrainerPayout(
            doc._id.toString(),
            doc.gymId,
            doc.trainerId,
            doc.amount,
            doc.notes,
            doc.date,
            doc.isDeleted
        );
    }

    static toDocument(entity: TrainerPayout): Partial<ITrainerPayoutDocument> {
        return {
            gymId: entity.gymId,
            trainerId: entity.trainerId,
            amount: entity.amount,
            notes: entity.notes,
            date: entity.date,
            isDeleted: entity.isDeleted
        };
    }
}
