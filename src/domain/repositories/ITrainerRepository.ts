import { IBaseRepository } from "./IBaseRepository";
import { Trainer } from "../entities/Trainer";




export interface ITrainerRepository extends IBaseRepository<Trainer> {
    findByEmail(email: string): Promise<Trainer | null>

    findVerifiedByEmail(email: string): Promise<true | false>;
    getTrainersByGymId(gymId: string, skip: number, limit: number, search?: string): Promise<{
        trainers: Trainer[],
        total: number
    }>
    updateTrainer(trainer: Trainer): Promise<Trainer>;
    softDelete(trainerId: string): Promise<void>;
    setPassword(id: string, passwordHash: string): Promise<void>;

}