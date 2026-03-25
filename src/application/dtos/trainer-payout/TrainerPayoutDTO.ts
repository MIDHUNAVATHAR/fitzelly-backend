export interface CreateTrainerPayoutRequestDTO {
    trainerId: string;
    amount: number;
    notes?: string;
    date?: Date;
}

export interface UpdateTrainerPayoutRequestDTO {
    trainerId?: string;
    amount?: number;
    notes?: string;
    date?: Date;
}

export interface TrainerPayoutResponseDTO {
    id: string;
    gymId: string;
    trainerId: string;
    amount: number;
    notes: string | null;
    date: Date;
    trainerName?: string; // Optional for UI convenience
}
