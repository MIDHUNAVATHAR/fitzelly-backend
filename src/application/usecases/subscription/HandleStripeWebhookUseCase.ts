import { IHandleStripeWebhookUseCase, IHandleStripeWebhookInput } from "../../IUseCases/subscription/IHandleStripeWebhookUseCase";
import { IPaymentService } from "../../../domain/services/IPaymentService";
import { IFulfillSubscriptionUseCase } from "../../IUseCases/subscription/IFulfillSubscriptionUseCase";
import { logger } from "../../../infrastructure/logger/logger";
import { AppError } from "../../errors/AppError";
import { HttpStatus } from "../../../constants/statusCodes.constants";

export class HandleStripeWebhookUseCase implements IHandleStripeWebhookUseCase {
    constructor(
        private _paymentService: IPaymentService,
        private _fulfillSubscriptionUseCase: IFulfillSubscriptionUseCase
    ) {}

    async execute(input: IHandleStripeWebhookInput): Promise<void> {
        const { body, signature, secret } = input;

        // Verify the webhook event using the IPaymentService
        let event;
        try {
            event = this._paymentService.constructWebhookEvent(body, signature, secret);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            throw new AppError(`Webhook Signature verification failed: ${msg}`, HttpStatus.BAD_REQUEST);
        }

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                const { gymId, planId } = event.metadata || {};

                if (!gymId || !planId) {
                    logger.error("Missing gymId or planId in session metadata");
                    throw new AppError("Missing gymId or planId in session metadata", HttpStatus.BAD_REQUEST);
                }

                

                // Delegate database update and plan calculation to the FulfillSubscriptionUseCase
                await this._fulfillSubscriptionUseCase.execute({
                    gymId,
                    planId,
                    paymentIntentId: event.paymentIntentId as string,
                    sessionId: event.sessionId
                });

                logger.info(`Subscription successfully created for gym ID: ${gymId}`);
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }
}
