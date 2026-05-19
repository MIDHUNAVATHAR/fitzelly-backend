import Stripe from 'stripe';
import { IPaymentService, ICreatePaymentSessionInput, IPaymentSessionResult, IPaymentWebhookEvent } from "../../domain/services/IPaymentService";

interface StripeCheckoutSession {
    id: string;
    payment_intent: string | null;
    metadata: Record<string, string> | null;
}

export class StripeService implements IPaymentService {
    private _stripe: InstanceType<typeof Stripe>;

    constructor() {
        this._stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
    }

    async createCheckoutSession(input: ICreatePaymentSessionInput): Promise<IPaymentSessionResult> {
        const { gymId, gymEmail, planId, planName, planDescription, planDurationMonths, price } = input;

        const session = await this._stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Fitzelly ${planName} Plan`,
                        description: planDescription || `${planDurationMonths} months subscription`,
                    },
                    unit_amount: price * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/gym/settings/subscription?success=true&session_id={CHECKOUT_SESSION_ID}&plan_id=${planId}`,
            cancel_url: `${process.env.FRONTEND_URL}/gym/settings/subscription?canceled=true`,
            customer_email: gymEmail,
            metadata: {
                gymId,
                planId,
                planName,
                durationMonths: planDurationMonths
            }
        });

        return {
            sessionId: session.id,
            url: session.url
        };
    }

    async verifyPaymentStatus(sessionId: string): Promise<boolean> {
        const session = await this._stripe.checkout.sessions.retrieve(sessionId);
        return session.payment_status === 'paid';
    }

    constructWebhookEvent(rawBody: string | Buffer, signature: string, secret: string): IPaymentWebhookEvent {
        const stripeEvent = this._stripe.webhooks.constructEvent(rawBody, signature, secret);
        
        let sessionId = "";
        let paymentIntentId: string | null = null;
        let metadata: Record<string, string> | null = null;

        if (stripeEvent.type === 'checkout.session.completed') {
            const session = stripeEvent.data.object as StripeCheckoutSession;
            sessionId = session.id;
            paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
            metadata = session.metadata;
        }

        return {
            type: stripeEvent.type,
            sessionId,
            paymentIntentId,
            metadata
        };
    }
}
