
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { QueryFilter } from "mongoose";
import { BaseRepository } from "./BaseRepository";
import { Client } from "../../domain/entities/Client";
import { clientModel } from "../database/mongoose/models/ClientModel";
import { MembershipModel } from "../database/mongoose/models/MembershipModel";
import { IClientDocument } from "../database/mongoose/types/IClientDocument";
import { ClientMapper } from "../mapper/ClientMapper";
import { IClientData } from "../../domain/repositories/IClientRepository";
import { NotFoundError } from "../../domain/errors/NotFoundError";


export class ClientRepository extends BaseRepository<Client, IClientDocument> implements IClientRepository {
    constructor() {
        super(clientModel);
    }

    protected toEntity(clientDoc: IClientDocument): Client {
        return ClientMapper.toEntity(clientDoc);
    }

    protected toDocument(clientEntity: Client): Partial<IClientDocument> {
        console.log(ClientMapper.toDocument(clientEntity))
        return ClientMapper.toDocument(clientEntity);
    }

    async findByEmail(email: string): Promise<Client | null> {
        const doc = await this.model.findOne({
            email, isDeleted:false
        });
        return doc ? this.toEntity(doc) : null
    }

    async findVerifiedByEmail(email: string): Promise<true | false> {
        const clientDoc = await this.model.findOne({ email, isEmailVerified: true, isDeleted: false });
        if (!clientDoc) return false;
        return true;
    };

    async getClientsByGymId(gymId: string, skip: number, limit: number, search?: string):
        Promise<{ clients: Client[]; total: number; }> {

        const filter: QueryFilter<IClientDocument> = {
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
            clients: docs.map(doc => ClientMapper.toEntity(doc)),
            total
        }

    }

    async updateClient(client: Client): Promise<Client> {
        const document = this.toDocument(client);
        const updatedDoc = await this.model.findByIdAndUpdate(
            client.id,
            { $set: document },
            { new: true }
        );

        if (!updatedDoc) {
            throw new NotFoundError("Client");
        }

        return ClientMapper.toEntity(updatedDoc as IClientDocument);
    }

    async getClientsByTrainerId(trainerId: string, skip: number, limit: number, search?: string):
        Promise<{ clients: Client[]; total: number; }> {

        const memberships = await MembershipModel.find({
            assignedTrainerId: trainerId,
            status: 'ACTIVE',
            isDeleted: false
        }).exec();

        const clientIds = memberships.map(m => m.clientId);

        const filter: QueryFilter<IClientDocument> = {
            _id: { $in: clientIds },
            isDeleted: false,
        };

        if (search && search.trim().length > 0) {
            filter.$or = [
                { fullName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } }
            ];
        }

        const [docs, total] = await Promise.all([
            this.model
                .find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ joinedDate: -1 }),

            this.model.countDocuments(filter)
        ]);

        return {
            clients: docs.map(doc => ClientMapper.toEntity(doc)),
            total
        };
    }

    async updateClientByGym(clientId: string, clientData: IClientData): Promise<Client> {
        const updatedClient = await this.model.findByIdAndUpdate(clientId, clientData, { new: true });
        if (!updatedClient) {
            throw new NotFoundError("Client")
        }
        return ClientMapper.toEntity(updatedClient);
    }

    async softDelete(clientId: string): Promise<void> {
        const client = await this.model.findByIdAndUpdate(clientId, { isDeleted: true }, { new: true });
        if (!client) {
            throw new NotFoundError("Client");
        }
    }

    async updatePassword(client: Client): Promise<void> {

        await this.model.findByIdAndUpdate(client.id, {
            $set: {
                password: client.password,
                isEmailVerified: client.isEmailVerified
            }
        });
    }

    async setPassword(id: string, passwordHash: string): Promise<void> {
        const client = await this.model.findByIdAndUpdate(id, { password: passwordHash, isEmailVerified: true }, { new: true });
        if (!client) {
            throw new NotFoundError("Client")
        }
    }

}