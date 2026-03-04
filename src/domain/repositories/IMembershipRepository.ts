import { Membership } from "../entities/Membership";

export interface IMembershipRepository {
    findLatestByClientId(clientId: string): Promise<Membership | null>;
    findLatestByClientIds?(clientIds: string[]): Promise<Membership[]>
    create(membership: Membership): Promise<Membership>;
    findById(id: string): Promise<Membership | null>
    findByGymId(gymId: string): Promise<Membership[]>;
    update(id: string, updates: Partial<Membership>): Promise<Membership | null>;
    delete(id: string): Promise<boolean>
}