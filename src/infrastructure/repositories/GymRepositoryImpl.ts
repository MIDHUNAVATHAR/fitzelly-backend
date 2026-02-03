import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { Gym } from "../../domain/entities/Gym";
import { GymModel } from "../database/mongoose/models/GymModel";
import { IGymDocument } from "../database/mongoose/types/IGymDocument";
import { BaseRepositoryImpl } from "./BaseRepositoryImpl";



export class GymRepositoryImpl extends BaseRepositoryImpl<Gym, IGymDocument> implements IGymRepository {

    constructor() {
        super(GymModel)
    }

    protected toEntity(doc: IGymDocument): Gym {
        return new Gym(
            doc._id.toString(),
            doc.email,
            doc.password,
            doc.role
        )
    }

    protected toDocument(entity: Gym): Partial<IGymDocument> {
        return {
            email: entity.email,
            password: entity.password,
            role: entity.role,
        }
    }

    async findByEmail(email: string): Promise<Gym | null> {
        const gymDoc = await this.model.findOne({ email })
        if (!gymDoc) return null;

        return this.toEntity(gymDoc);
    }


    async updatePassword(email: string, password: string): Promise<void> {
        const result = await this.model.findOneAndUpdate({ email }, { password });
        if (!result) {
            throw new Error("password update failed");
        }
    }

}