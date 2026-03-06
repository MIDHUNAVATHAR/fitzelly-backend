export class Membership {
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly clientName: string,
        public readonly gymId: string,
        public readonly planId: string,
        public readonly planName: string,
        public readonly planAmount: number,
        public readonly planType: "DAY_BASED" | "CATEGORY_BASED",
        public readonly startDate: Date,
        public readonly expiryDate: Date | null,
        public readonly status: "ACTIVE" | "EXPIRED",
        public readonly daysLeft: number | null,
        public readonly assignedTrainerId: string | null,
        public readonly assignedTrainerName: string | null,
        public readonly isDeleted: boolean

    ) { }
}