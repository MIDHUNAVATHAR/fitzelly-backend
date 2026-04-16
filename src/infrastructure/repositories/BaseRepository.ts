import { Model } from "mongoose";
import { IBaseRepository } from "../../domain/repositories/IBaseRepository";

export abstract class BaseRepository<T extends { id: string }, D> implements IBaseRepository<T> {//T -must be type of object, generic with specific condition. D -document type 
    protected model: Model<D>;

    constructor(model: Model<D>) {
        this.model = model;
    }

    // db -> domain 
    protected abstract toEntity(doc: D): T;

    //domain -> db
    protected abstract toDocument(entity: T): Partial<D>;

    async create(entity: T): Promise<T> {
        const doc = this.toDocument(entity);
        const createdDoc = await this.model.create(doc);
        return this.toEntity(createdDoc)
    }

    async findById(id: string): Promise<T | null> {
        const doc = await this.model.findById(id);
        return doc ? this.toEntity(doc) : null;
    }

    async update(entity: T): Promise<T> {
        const doc = this.toDocument(entity);
        const updatedDoc = await this.model.findByIdAndUpdate(
            entity.id,
            { $set: doc },
            { new: true }
        );
        if (!updatedDoc) throw new Error("Entity not found");
        return this.toEntity(updatedDoc);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id);
        return !!result;
    }

}


