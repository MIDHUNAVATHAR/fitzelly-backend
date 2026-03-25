import { EquipmentBooking } from "../../domain/entities/EquipmentBooking";
import { IEquipmentBookingRepository } from "../../domain/repositories/IEquipmentBookingRepository";
import { EquipmentBookingModel } from "../database/mongoose/models/EquipmentBookingModel";
import { EquipmentBookingMapper } from "../mapper/EquipmentBookingMapper";
import { IEquipmentBooking } from "../database/mongoose/types/IEquipmentBooking";

export class EquipmentBookingRepository implements IEquipmentBookingRepository {
    async create(booking: EquipmentBooking): Promise<EquipmentBooking> {
        const doc = EquipmentBookingMapper.toDocument(booking);
        const createdDoc = await EquipmentBookingModel.create(doc);
        return EquipmentBookingMapper.toEntity(createdDoc);
    }

    async findById(id: string): Promise<EquipmentBooking | null> {
        const doc = await EquipmentBookingModel.findById(id);
        return doc ? EquipmentBookingMapper.toEntity(doc) : null;
    }

    async findByClientId(clientId: string): Promise<EquipmentBooking[]> {
        const docs = await EquipmentBookingModel.find({ clientId, status: 'BOOKED' }).sort({ date: 1, startTime: 1 });
        return docs.map(doc => EquipmentBookingMapper.toEntity(doc));
    }

    async findByEquipmentIdAndDate(equipmentId: string, date: Date): Promise<EquipmentBooking[]> {
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const docs = await EquipmentBookingModel.find({
            equipmentId,
            date: { $gte: startOfDay, $lte: endOfDay },
            status: 'BOOKED'
        });
        return docs.map(doc => EquipmentBookingMapper.toEntity(doc));
    }

    async cancel(id: string): Promise<void> {
        await EquipmentBookingModel.findByIdAndUpdate(id, { status: 'CANCELLED' });
    }

    async countBySlot(equipmentId: string, date: Date, startTime: string): Promise<number> {
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        return await EquipmentBookingModel.countDocuments({
            equipmentId,
            date: { $gte: startOfDay, $lte: endOfDay },
            startTime,
            status: 'BOOKED'
        });
    }
    async countByClientAndDate(clientId: string, date: Date): Promise<number> {
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        return await EquipmentBookingModel.countDocuments({
            clientId,
            date: { $gte: startOfDay, $lte: endOfDay },
            status: 'BOOKED'
        });
    }
}
