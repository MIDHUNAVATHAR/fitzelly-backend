import { IBaseRepository } from "./IBaseRepository";
import { Trainer } from "../entities/Trainer";


export interface ITrainerRepository extends IBaseRepository<Trainer> {
    findByEmail(email: string): Promise<Trainer | null>

    findVerifiedByEmail(email: string): Promise<true | false>;
    getTrainersByGymId(gymId: string, skip: number, limit: number, search?: string): Promise<{
        trainers: Trainer[],
        total: number
    }>
    update(trainer: Trainer): Promise<Trainer>;

    updateProfile(trainer: Trainer): Promise<void>;
    softDelete(trainerId: string): Promise<void>;
    setPassword(id: string, passwordHash: string): Promise<void>;

}