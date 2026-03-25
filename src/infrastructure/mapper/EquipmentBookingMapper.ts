import { EquipmentBooking } from "../../domain/entities/EquipmentBooking";
import { IEquipmentBooking } from "../database/mongoose/types/IEquipmentBooking";

export class EquipmentBookingMapper {
    static toEntity(doc: any): EquipmentBooking {
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
        const doc: any = {
            clientId: entity.clientId,
            gymId: entity.gymId,
            equipmentId: entity.equipmentId,
            date: entity.date,
            startTime: entity.startTime,
            endTime: entity.endTime,
            status: entity.status,
        };
        if (entity.id) doc._id = entity.id;
        return doc;
    }
}
