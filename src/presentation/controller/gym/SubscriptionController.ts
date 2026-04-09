import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { GymRepository } from "../../../infrastructure/repositories/GymRepository";
import Stripe from 'stripe';
import { Subscription } from "../../../domain/entities/Subscription";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: '2024-04-10' as any
});

export class SubscriptionController {
    constructor(
        private _subscriptionRepo: ISubscriptionRepository,
        private _planRepo: ISubscriptionPlanRepository,
        private _gymRepo: GymRepository
    ) { }

    async getAvailablePlans(_req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const plans = await this._planRepo.findAllNotDeleted();
            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data: plans
            });
        } catch (error) {
            next(error);
        }
    }

    async createCheckoutSession(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { planId } = req.body;
            const gymId = req.user!.id;
            const gymEmail = req.user!.email;

            // Check if user already has an active subscription
            const latestSub = await this._subscriptionRepo.findLatestSubscriptionByGymId(gymId);
            if (latestSub && latestSub.status == "active") {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: ResponseStatus.FAIL,
                    message: "Your current subscription is not expired yet."
                });
            }

            const plan = await this._planRepo.findById(planId);
            if (!plan) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    status: ResponseStatus.FAIL,
                    message: "Plan not found"
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Fitzelly ${plan.name} Plan`,
                            description: plan.description || `${plan.durationMonths} months subscription`,
                        },
                        unit_amount: plan.price * 100, // Stripe expects amounts in cents/paise
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
                    planName: plan.name,
                    durationMonths: plan.durationMonths
                }
            });

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                data: { sessionId: session.id, url: session.url }
            });
        } catch (error: any) {
            console.error("Stripe Error Details:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: ResponseStatus.ERROR,
                message: error.message || "Something went wrong with the payment gateway"
            });
        }
    }

    async confirmSubscription(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { sessionId, planId } = req.body;
            const gymId = req.user!.id;

            const session = await stripe.checkout.sessions.retrieve(sessionId);
            const paymentStatus = session.payment_status;
            const paymentIntent = session.payment_intent as string;

            if (paymentStatus !== 'paid') {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: ResponseStatus.FAIL,
                    message: "Payment not completed"
                });
            }

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Payment verified. Your subscription will be active shortly.",
            });
        } catch (error: any) {
            console.error("Subscription Confirmation Error:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: ResponseStatus.ERROR,
                message: error.message || "Failed to confirm subscription"
            });
        }
    }
}
