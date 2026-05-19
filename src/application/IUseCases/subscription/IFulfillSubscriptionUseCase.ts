export interface IFulfillSubscriptionInput {
    gymId: string;
    planId: string;
    paymentIntentId: string;
    sessionId: string;
}

export interface IFulfillSubscriptionUseCase {
    execute(input: IFulfillSubscriptionInput): Promise<void>;
}
