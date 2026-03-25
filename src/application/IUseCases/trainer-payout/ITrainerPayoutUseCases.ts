import { CreateTrainerPayoutRequestDTO, UpdateTrainerPayoutRequestDTO, TrainerPayoutResponseDTO } from "../../dtos/trainer-payout/TrainerPayoutDTO";

export interface IAddTrainerPayoutUseCase {
    execute(gymId: string, data: CreateTrainerPayoutRequestDTO): Promise<TrainerPayoutResponseDTO>;
}

export interface IGetTrainerPayoutsUseCase {
    execute(
        gymId: string,
        page: number,
        limit: number,
        trainerId?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ payouts: TrainerPayoutResponseDTO[]; total: number }>;
}

export interface IUpdateTrainerPayoutUseCase {
    execute(id: string, data: UpdateTrainerPayoutRequestDTO): Promise<TrainerPayoutResponseDTO>;
}

export interface IDeleteTrainerPayoutUseCase {
    execute(id: string): Promise<boolean>;
}

export interface IGetTrainerEarningsUseCase {
    execute(
        trainerId: string,
        page: number,
        limit: number
    ): Promise<{ payouts: TrainerPayoutResponseDTO[]; total: number }>;
}
