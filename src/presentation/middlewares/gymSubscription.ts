import { Response, NextFunction } from "express";
import { AuthRequest } from "./protect";
import { GymModel } from "../../infrastructure/database/mongoose/models/GymModel";
import { SubscriptionModel } from "../../infrastructure/database/mongoose/models/SubscriptionModel";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { ROLES } from "../../constants/roles.constants";

/**
 * Middleware to check if the gym's subscription is active.
 * For Gym role: Checks its own subscription.
 * For Client/Trainer role: Checks their associated gym's subscription.
 */

export const isSubscriptionActive = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        // Skip if no user or superadmin
        if (!user || user.role === ROLES.SUPERADMIN) {
            return next();
        }

        let gymId = '';
        if (user.role === ROLES.GYM) {
            gymId = user.id;
        } else if (user.role === ROLES.CLIENT || user.role === ROLES.TRAINER) {
            gymId = user.gymId || '';
        }

        if (!gymId) {
            return next();
        }

        // Fetch the latest subscription for the gym
        const subscription = await SubscriptionModel.findOne({ gymId })
            .sort({ createdAt: -1 });

        if (!subscription) {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: ResponseStatus.FAIL,
                message: "GYM_SUBSCRIPTION_EXPIRED"
            });
        }

        // Check subscription status and expiry date
        const now = new Date();
        const isStatusExpired = subscription.status === "expired";
        const isDateExpired = subscription.endDate && new Date(subscription.endDate) < now;

        if (isStatusExpired || isDateExpired) {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: ResponseStatus.FAIL,
                message: "GYM_SUBSCRIPTION_EXPIRED"
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};
