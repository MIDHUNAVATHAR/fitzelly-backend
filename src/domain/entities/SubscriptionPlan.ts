export class SubscriptionPlan {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly price: number,
        public readonly durationMonths: number,
        public readonly description: string = "",
        public readonly isDeleted: boolean = false,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) { }
}
