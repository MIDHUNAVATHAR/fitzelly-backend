import { EquipmentBooking } from "../../domain/entities/EquipmentBooking";
import { IEquipmentBooking } from "../database/mongoose/types/IEquipmentBooking";
import { Types } from "mongoose";

export class EquipmentBookingMapper {
    static toEntity(doc: IEquipmentBooking & { _id: Types.ObjectId; createdAt: Date }): EquipmentBooking {
        return new EquipmentBooking(
            doc._id.toString(),
            doc.clientId.toString(),
            doc.gymId.toString(),
            doc.equipmentId.toString(),
            doc.date,
            doc.startTime,
            doc.endTime,
            doc.status,
            doc.createdAt
        );
    }

    static toDocument(entity: EquipmentBooking): Partial<IEquipmentBooking> {
        const doc: Partial<IEquipmentBooking> & { _id?: string } = {
            clientId: new Types.ObjectId(entity.clientId),
            gymId: new Types.ObjectId(entity.gymId),
            equipmentId: new Types.ObjectId(entity.equipmentId),
            date: entity.date,
            startTime: entity.startTime,
            endTime: entity.endTime,
            status: entity.status,
        };
        if (entity.id) doc._id = entity.id;
        return doc;
    }
}
