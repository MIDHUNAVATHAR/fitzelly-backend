import { Gym } from "../entities/Gym";
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

export interface IGymRepository extends IBaseRepository<Gym> {
    findByEmail(email: string): Promise<Gym | null>;
    updatePassword(email: string, password: string): Promise<void>
    update(id: string, gymData: IGymData): Promise<Gym>
    updateLogo(id: string, logoUrl: string): Promise<Gym>
}


