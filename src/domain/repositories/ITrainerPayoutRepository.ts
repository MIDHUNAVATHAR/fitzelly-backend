import { TrainerPayout } from "../entities/TrainerPayout";
import { IBaseRepository } from "./IBaseRepository";

export interface ITrainerPayoutRepository extends IBaseRepository<TrainerPayout> {
    getPayoutsByGymId(
        gymId: string,
        skip: number,
        limit: number,
        trainerId?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ payouts: TrainerPayout[]; totalCount: number }>;

    deletePayout(id: string): Promise<boolean>;
    getPayoutsByTrainerId(
        trainerId: string,
        skip: number,
        limit: number
    ): Promise<{ payouts: TrainerPayout[]; totalCount: number }>;
}
