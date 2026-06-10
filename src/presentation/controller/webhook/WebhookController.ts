import { Request, Response, NextFunction } from "express";
import { IHandleStripeWebhookUseCase } from "../../../application/IUseCases/subscription/IHandleStripeWebhookUseCase";
import { HttpStatus } from "../../../constants/statusCodes.constants";
import { logger } from "../../../infrastructure/logger/logger";

export class WebhookController {
    constructor(
        private _handleStripeWebhookUseCase: IHandleStripeWebhookUseCase
    ) { }

    async handleStripeWebhook(req: Request, res: Response, _next: NextFunction) {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        try {
            if (!sig || !endpointSecret) {
                console.error("Missing Stripe signature or webhook secret");
                return res.status(HttpStatus.BAD_REQUEST).send('Webhook Error: Missing signature or secret');
            }

            // delegate to the Stripe webhook handling use case
            await this._handleStripeWebhookUseCase.execute({
                body: req.body,
                signature: sig as string,
                secret: endpointSecret
            });

            return res.status(HttpStatus.OK).json({ received: true });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            logger.error(`Webhook processing failed: ${msg}`);
            return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${msg}`);
        }
    }
}
