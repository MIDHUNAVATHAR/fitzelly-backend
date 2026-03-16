import { Types } from "mongoose";
import { BaseRepository } from "./BaseRepository";
import { ITrainerRepository } from "../../domain/repositories/ITrainerRepository";
import { Trainer } from "../../domain/entities/Trainer";
import { ITrainerDocument } from "../database/mongoose/types/ITrainerDocument";
import { TrainerModel } from "../database/mongoose/models/TrainerModel";
import { TrainerMapper } from "../mapper/TrainerMapper";
import { QueryFilter } from "mongoose";
import { NotFoundError } from "../../domain/errors/NotFoundError";


export class TrainerRepository extends BaseRepository<Trainer, ITrainerDocument> implements ITrainerRepository {
    constructor() {
        super(TrainerModel);
    }

    /**
     * db -> domain 
     */
    protected toEntity(doc: ITrainerDocument): Trainer {
        return new Trainer(
            doc._id.toString(),
            doc.gymId.toString(),
            doc.email,
            null,
            doc.profileUrl ?? null,
            doc.fullName,
            doc.phoneNumber,
            doc.dateOfBirth ?? null,
            doc.salary?.toString() ?? null,
            doc.specialization,
            doc.qualification ?? "",
            doc.address ?? "",
            doc.certificates ?? [],
            doc.isEmailVerified,
            doc.joinedDate,
            doc.isDeleted
        );
    }

    protected toDocument(entity: Trainer): Partial<ITrainerDocument> {
        return {
            gymId: new Types.ObjectId(entity.gymId),
            email: entity.email,
            fullName: entity.fullName,
            phoneNumber: entity.phoneNumber,
            profileUrl: entity.profileUrl ?? "",
            dateOfBirth: entity.dateOfBirth ?? undefined,
            specialization: entity.specialization,
            qualification: entity.qualification,
            address: entity.address,
            certificates: entity.certificates,
            salary: entity.salary ? Number(entity.salary) : 0,
            joinedDate: entity.joinedDate,
            isEmailVerified: entity.isEmailVerified,
            isDeleted: entity.isDeleted
        };
    }

    async findByEmail(email: string): Promise<Trainer | null> {
        const doc = await this.model.findOne({ email, isDeleted: false });
        return doc ? TrainerMapper.toEntity(doc) : null;
    }

    async findVerifiedByEmail(email: string): Promise<true | false> {
        const trainer = await this.model.findOne({
            email,
            isEmailVerified: true,
            isDeleted: false
        });
        return !!trainer;
    }

    async getTrainersByGymId(gymId: string, skip: number, limit: number, search?: string):
        Promise<{ trainers: Trainer[]; total: number; }> {

        const filter: QueryFilter<ITrainerDocument> = {
            gymId,
            isDeleted: false,
        }

        if (search && search.trim().length > 0) {
            filter.$or = [
                { fullName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } }
            ]
        }

        const [docs, total] = await Promise.all([
            this.model
                .find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ joinedDate: -1 }),

            this.model.countDocuments(filter)
        ])

        return {
            trainers: docs.map(doc => TrainerMapper.toEntity(doc)),
            total
        }

    }

    async update(trainer: Trainer): Promise<Trainer> {
        const document = this.toDocument(trainer);
        const updatedDoc = await this.model.findByIdAndUpdate(trainer.id, { $set: document }, { new: true });
        if (!updatedDoc) {
            throw new Error("Trainer not found")
        }

        return TrainerMapper.toEntity(updatedDoc);
    }

    async updateProfile(trainer: Trainer): Promise<void> {
        const document = this.toDocument(trainer);
        await this.model.findByIdAndUpdate(
            trainer.id,
            {
                $set: {
                    fullName: document.fullName,
                    phoneNumber: document.phoneNumber,
                    specialization: document.specialization,
                    dateOfBirth: document.dateOfBirth,
                    profileUrl: document.profileUrl,
                    qualification: document.qualification,
                    address: document.address
                }
            },
            { new: true }
        )
    }

    async getAssignedClients(trainerId: string) {
        const trainer = await this.model.findById(trainerId);
        return trainer?.assignedClients;
    }

    async softDelete(trainerId: string): Promise<void> {
        const trainer = await this.model.findByIdAndUpdate(trainerId, { isDeleted: true }, { new: true });
        if (!trainer) {
            throw new NotFoundError("Trainer not found")
        }
    }

    async setPassword(id: string, passwordHash: string): Promise<void> {
        const trainer = await this.model.findByIdAndUpdate(id, { password: passwordHash, isEmailVerified: true }, { new: true })
        if (!trainer) {
            throw new NotFoundError("Trainer not found")
        }
    }
}
