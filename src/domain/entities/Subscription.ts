export type SubscriptionStatus = "active" | "expired";

export class Subscription {
    constructor(
        public readonly id: string,
        public readonly gymId: string,
        public readonly gymName: string,
        public readonly planName: string,
        public readonly amount: number,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly status: SubscriptionStatus,
        public readonly paymentGateway: string | null = null,
        public readonly gatewayPaymentId: string | null = null,
        public readonly gatewayOrderId: string | null = null,
        public readonly createdAt: Date = new Date()
    ) { }
}
