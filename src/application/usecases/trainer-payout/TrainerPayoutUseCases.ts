import { TrainerPayout } from "../../../domain/entities/TrainerPayout";
import { ITrainerPayoutRepository } from "../../../domain/repositories/ITrainerPayoutRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { CreateTrainerPayoutRequestDTO, UpdateTrainerPayoutRequestDTO, TrainerPayoutResponseDTO } from "../../dtos/trainer-payout/TrainerPayoutDTO";
import { 
    IAddTrainerPayoutUseCase, 
    IGetTrainerPayoutsUseCase, 
    IUpdateTrainerPayoutUseCase, 
    IDeleteTrainerPayoutUseCase,
    IGetTrainerEarningsUseCase
} from "../../IUseCases/trainer-payout/ITrainerPayoutUseCases";

export class AddTrainerPayoutUseCase implements IAddTrainerPayoutUseCase {
    constructor(private _payoutRepository: ITrainerPayoutRepository) {}

    async execute(gymId: string, data: CreateTrainerPayoutRequestDTO): Promise<TrainerPayoutResponseDTO> {
        const payout = new TrainerPayout(
            "",
            gymId,
            data.trainerId,
            data.amount,
            data.notes || null,
            data.date ? new Date(data.date) : new Date()
        );
        const saved = await this._payoutRepository.create(payout);
        return this._mapToResponseDTO(saved);
    }

    private _mapToResponseDTO(payout: TrainerPayout): TrainerPayoutResponseDTO {
        return {
            id: payout.id,
            gymId: payout.gymId,
            trainerId: payout.trainerId,
            amount: payout.amount,
            notes: payout.notes,
            date: payout.date
        };
    }
}

export class GetTrainerPayoutsUseCase implements IGetTrainerPayoutsUseCase {
    constructor(
        private _payoutRepository: ITrainerPayoutRepository,
        private _trainerRepository: ITrainerRepository
    ) {}

    async execute(
        gymId: string,
        page: number,
        limit: number,
        trainerId?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ payouts: TrainerPayoutResponseDTO[]; total: number }> {
        const skip = (page - 1) * limit;
        const { payouts, totalCount } = await this._payoutRepository.getPayoutsByGymId(
            gymId,
            skip,
            limit,
            trainerId,
            startDate,
            endDate
        );

        // Fetch trainer names for better UI experience
        const trainers = await Promise.all(
            [...new Set(payouts.map(p => p.trainerId))].map(id => this._trainerRepository.findById(id))
        );
        const trainerMap = new Map(trainers.filter(t => t !== null).map(t => [t!.id, t!.fullName]));

        const responsePayouts = payouts.map(p => ({
            id: p.id,
            gymId: p.gymId,
            trainerId: p.trainerId,
            amount: p.amount,
            notes: p.notes,
            date: p.date,
            trainerName: trainerMap.get(p.trainerId) || "Unknown Trainer"
        }));

        return { payouts: responsePayouts, total: totalCount };
    }
}

export class UpdateTrainerPayoutUseCase implements IUpdateTrainerPayoutUseCase {
    constructor(private _payoutRepository: ITrainerPayoutRepository) {}

    async execute(id: string, data: UpdateTrainerPayoutRequestDTO): Promise<TrainerPayoutResponseDTO> {
        const existing = await this._payoutRepository.findById(id);
        if (!existing) throw new Error("Payout record not found");

        const updated = new TrainerPayout(
            existing.id,
            existing.gymId,
            data.trainerId || existing.trainerId,
            data.amount !== undefined ? data.amount : existing.amount,
            data.notes !== undefined ? data.notes : existing.notes,
            data.date ? new Date(data.date) : existing.date,
            existing.isDeleted
        );

        const saved = await this._payoutRepository.update(updated);
        return {
            id: saved.id,
            gymId: saved.gymId,
            trainerId: saved.trainerId,
            amount: saved.amount,
            notes: saved.notes,
            date: saved.date
        };
    }
}

export class DeleteTrainerPayoutUseCase implements IDeleteTrainerPayoutUseCase {
    constructor(private _payoutRepository: ITrainerPayoutRepository) {}

    async execute(id: string): Promise<boolean> {
        return await this._payoutRepository.deletePayout(id);
    }
}

export class GetTrainerEarningsUseCase implements IGetTrainerEarningsUseCase {
    constructor(private _payoutRepository: ITrainerPayoutRepository) {}

    async execute(
        trainerId: string,
        page: number,
        limit: number
    ): Promise<{ payouts: TrainerPayoutResponseDTO[]; total: number }> {
        const skip = (page - 1) * limit;
        const { payouts, totalCount } = await this._payoutRepository.getPayoutsByTrainerId(
            trainerId,
            skip,
            limit
        );

        const responsePayouts = payouts.map(p => ({
            id: p.id,
            gymId: p.gymId,
            trainerId: p.trainerId,
            amount: p.amount,
            notes: p.notes,
            date: p.date
        }));

        return { payouts: responsePayouts, total: totalCount };
    }
}
