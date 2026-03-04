
export class Payment {
    constructor(
        public readonly id: string,
        public readonly membershipId: string,
        public readonly amount: number,
        public readonly paymentDate: Date,
        public readonly note: string | null,
        public readonly isDeleted:boolean
    ) { }
}