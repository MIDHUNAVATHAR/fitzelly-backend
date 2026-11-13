export interface IHandleStripeWebhookInput {
    body: string|Buffer;
    signature: string;
    secret: string;
}

export interface IHandleStripeWebhookUseCase {
    execute(input: IHandleStripeWebhookInput): Promise<void>;
}
