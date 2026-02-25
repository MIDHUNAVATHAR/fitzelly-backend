import { IGymRepository, IGymData, GymSearchQuery, GymFindOptions, IGymStatus } from "../../domain/repositories/IGymRepository";
import { Gym } from "../../domain/entities/Gym";
import { GymModel } from "../database/mongoose/models/GymModel";
import { IGymDocument } from "../database/mongoose/types/IGymDocument";
import { BaseRepository } from "./BaseRepository";
import { GymMapper } from "../mapper/GymMapper";
import { NotFoundError } from "../../domain/errors/NotFoundError";


export class GymRepository extends BaseRepository<Gym, IGymDocument> implements IGymRepository {

    constructor() {
        super(GymModel);
    }

    protected toEntity(doc: IGymDocument): Gym {
        return GymMapper.toEntity(doc);
    }

    protected toDocument(entity: Gym): Partial<IGymDocument> {
        return GymMapper.toDocument(entity);
    }



    async findByEmail(email: string): Promise<Gym | null> {
        const gymDoc = await this.model.findOne({ email });
        if (!gymDoc) return null;

        return this.toEntity(gymDoc);
    }


    async updatePassword(email: string, password: string): Promise<void> {
        const result = await this.model.findOneAndUpdate({ email }, { password });
        if (!result) {
            throw new NotFoundError("Gym");
        }
    }

    async update(id: string, gymData: IGymData): Promise<Gym> {
        const gymDoc = await this.model.findByIdAndUpdate(id, gymData, { new: true });
        if (!gymDoc) {
            throw new NotFoundError("Gym")
        }
        return this.toEntity(gymDoc);
    }

    async updateLogo(id: string, logoUrl: string): Promise<Gym> {
        const gymDoc = await this.model.findByIdAndUpdate(id, { logoUrl }, { new: true });
        if (!gymDoc) {
            throw new NotFoundError("Gym")
        }
        return this.toEntity(gymDoc);
    }

    async findAll(query: GymSearchQuery, options: GymFindOptions): Promise<Gym[]> {
        const gymDocs = await this.model.find(query)
            .sort(options.sort ?? {})
            .skip(options.skip)
            .limit(options.limit);

        return gymDocs.map(doc => this.toEntity(doc));
    }

    async count(query: GymSearchQuery): Promise<number> {
        return this.model.countDocuments(query);
    }

    async updateStatus(id: string, gymData: IGymStatus): Promise<Gym> {
        const gymDoc = await this.model.findByIdAndUpdate(id, gymData, { new: true });
        if (!gymDoc) {
            throw new NotFoundError("Gym")
        }
        return this.toEntity(gymDoc);
    }

    async getGymsBySubscriptionStatus(status: string): Promise<Gym[]> {
        const gymDocs = await this.model.find({ subscriptionStatus: status });
        return gymDocs.map(doc => this.toEntity(doc))
    }


}