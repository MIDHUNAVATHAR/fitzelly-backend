import { Gym, IGymCertificate } from "../entities/Gym";
import { IBaseRepository } from "./IBaseRepository";

export interface IGymData {
    logoUrl: string;
    gymName: string;
    caption: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    location: { longitude: number, latitude: number };
}

export interface GymSearchQuery {
    gymName?: {
        $regex: string;
        $options: string;
    }
}

export interface GymFindOptions {
    skip: number;
    limit: number;
    sort?: {
        createdAt?: 1 | -1;
    }
}

export interface IGymStatus {
    approvalStatus?: 'Approved' | 'Pending' | 'Rejected' | 'Reapplied';
    subscriptionStatus?: 'Active' | 'Trial' | 'Expired' | 'Pending';
    expiryDate?: string | Date;
    rejectionReason?: string;
}

export interface IGymRepository extends IBaseRepository<Gym> {
    findByEmail(email: string): Promise<Gym | null>;
    updatePassword(email: string, password: string): Promise<void>
    updateLogo(id: string, logoUrl: string): Promise<Gym>;
    updateCertificates(id: string, certificates: IGymCertificate[]): Promise<Gym>;
    findAll(query: GymSearchQuery, options: GymFindOptions): Promise<Gym[]>;
    count(query: GymSearchQuery): Promise<number>
    updateStatus(id: string, gymData: IGymStatus): Promise<Gym>
    getGymsBySubscriptionStatus(status: string): Promise<Gym[]>
}


