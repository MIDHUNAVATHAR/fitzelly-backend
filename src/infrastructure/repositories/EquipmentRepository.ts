import { Equipment } from "../../domain/entities/Equipment";
import { IEquipmentRepository } from "../../domain/repositories/IEquipmentRepository";
import { EquipmentModel } from "../database/mongoose/models/EquipmentModel";


export class EquipmentRepository implements IEquipmentRepository {
    async save(equipment: Equipment): Promise<Equipment> {
        let savedDoc;

        const data = {
            gymId: equipment.gymId,
            name: equipment.name,
            description: equipment.description,
            image: equipment.image,
            startBookingTime: equipment.startBookingTime,
            availableDays: equipment.availableDays,
            availableFrom: equipment.availableFrom,
            availableTo: equipment.availableTo,
            allowedPlans: equipment.allowedPlans,
            maxUsageMinutes: equipment.maxUsageMinutes,
            capacity: equipment.capacity,
            slotIntervalMinutes: equipment.slotIntervalMinutes,
            isActive: equipment.isActive,
            isDeleted: equipment.isDeleted
        };

        if (equipment.id) {
            const updated = await EquipmentModel.findByIdAndUpdate(
                equipment.id,
                data,
                { new: true }
            ).exec();

            if (!updated) {
                throw new Error('Equipment not found');
            }
            savedDoc = updated;
        } else {
            const newEquipment = new EquipmentModel(data);
            savedDoc = await newEquipment.save();
        }

        return this.mapToEntity(savedDoc);
    }

    async findById(id: string): Promise<Equipment | null> {
        const doc = await EquipmentModel.findById(id).exec();
        return doc ? this.mapToEntity(doc) : null;
    }

    async findAllByGym(gymId: string, page: number, limit: number, search?: string): Promise<{ equipments: Equipment[], total: number }> {
        const query: any = { gymId, isDeleted: false };
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const skip = (page - 1) * limit;
        const [docs, total] = await Promise.all([
            EquipmentModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            EquipmentModel.countDocuments(query).exec()
        ]);

        return {
            equipments: docs.map(doc => this.mapToEntity(doc)),
            total
        };
    }

    private mapToEntity(doc: any): Equipment {
        return new Equipment(
            doc._id.toString(),
            doc.gymId.toString(),
            doc.name,
            doc.description,
            doc.image,
            doc.startBookingTime,
            doc.availableDays,
            doc.availableFrom,
            doc.availableTo,
            doc.allowedPlans?.map((id: any) => id.toString()) || [],
            doc.maxUsageMinutes,
            doc.capacity,
            doc.slotIntervalMinutes,
            doc.isActive,
            doc.isDeleted
        );
    }
}
