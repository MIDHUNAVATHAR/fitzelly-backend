export class TrainerPayout {
    constructor(
        public readonly id: string,
        public readonly gymId: string,
        public readonly trainerId: string,
        public readonly amount: number,
        public readonly notes: string | null,
        public readonly date: Date,
        public readonly isDeleted: boolean = false
    ) {}
}
