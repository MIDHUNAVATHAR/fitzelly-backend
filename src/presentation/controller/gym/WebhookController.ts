import { Request, Response, NextFunction } from "express";
import { IPaymentService, IPaymentWebhookEvent } from "../../../domain/services/IPaymentService";
import { IFulfillSubscriptionUseCase } from "../../../application/IUseCases/subscription/IFulfillSubscriptionUseCase";
import { HttpStatus } from "../../../constants/statusCodes.constants";
import { logger } from "../../../infrastructure/logger/logger";

export class WebhookController {
    constructor(
        private _paymentService: IPaymentService,
        private _fulfillSubscriptionUseCase: IFulfillSubscriptionUseCase
    ) { }

    async handleStripeWebhook(req: Request, res: Response, _next: NextFunction) {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event: IPaymentWebhookEvent;

        try {
            if (!sig || !endpointSecret) {
                console.error("Missing Stripe signature or webhook secret");
                return res.status(HttpStatus.BAD_REQUEST).send('Webhook Error: Missing signature or secret');
            }

            // webhook verification using the IPaymentService
            event = this._paymentService.constructWebhookEvent(req.body, sig as string, endpointSecret);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            logger.error(`Webhook Signature verification failed: ${msg}`);
            return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${msg}`);
        }

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                await this.fullfillSubscription(event);
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(HttpStatus.OK).json({ received: true });
    }

    private async fullfillSubscription(event: IPaymentWebhookEvent) {
        try {
            const { gymId, planId } = event.metadata || {};

            if (!gymId || !planId) {
                logger.error("Missing gymId or planId in session metadata");
                return;
            }

            // Delegate database update and plan calculation to the FulfillSubscriptionUseCase
            await this._fulfillSubscriptionUseCase.execute({
                gymId,
                planId,
                paymentIntentId: event.paymentIntentId as string,
                sessionId: event.sessionId
            });

            logger.info(`Subscription successfully created for gym ID: ${gymId}`);
        } catch (error) {
            logger.error("Error fulfilling subscription:", error);
        }
    }
}
