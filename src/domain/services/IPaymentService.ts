export interface ICreatePaymentSessionInput {
    gymId: string;
    gymEmail: string;
    planId: string;
    planName: string;
    planDescription?: string;
    planDurationMonths: number;
    price: number;
}

export interface IPaymentSessionResult {
    sessionId: string;
    url: string | null;
}

export interface IPaymentWebhookEvent {
    data: unknown;
    type: string;
    sessionId: string;
    paymentIntentId: string | null;
    metadata: Record<string, string> | null;
}

export interface IPaymentService {
    createCheckoutSession(input: ICreatePaymentSessionInput): Promise<IPaymentSessionResult>;
    verifyPaymentStatus(sessionId: string): Promise<boolean>;
    constructWebhookEvent(rawBody: string | Buffer, signature: string, secret: string): IPaymentWebhookEvent;
}

