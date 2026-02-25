import { IBaseRepository } from "./IBaseRepository";
import { Client } from "../entities/Client";

export interface IClientData {
    fullName: string;
    phoneNumber: string;
    dateOfBirth: string;
    emergencyContact: string;
    contactPerson: string;
    email?: string;
}

export interface IClientRepository extends IBaseRepository<Client> {
    findByEmail(email: string): Promise<Client | null>
    findVerifiedByEmail(email: string): Promise<true | false>;
    getClientsByGymId(gymId: string, skip: number, limit: number, search?: string): Promise<{
        clients: Client[],
        total: number
    }>
    updateClientByGym(id: string, clientData: IClientData): Promise<Client>;
    softDelete(clientId: string): Promise<void>;
    updatePassword(client: Client): Promise<void>;
    setPassword(id: string, passwordHash: string): Promise<void>;
}

