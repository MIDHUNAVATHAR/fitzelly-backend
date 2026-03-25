import cron from 'node-cron';
import { MembershipModel } from '../database/mongoose/models/MembershipModel';
import { GymModel } from '../database/mongoose/models/GymModel';

export class AutomatedExpiryCronService {
    constructor() { }

    init() {
        console.log("Initializing Automated Expiry Cron Job...");

        /**
         *  Run daily at 12:00 AM
         */
        cron.schedule('0 0 * * *', async () => {
            console.log("Running Daily Automated Expiry Check...");
            await this.processExpirations();
        });

        /**
         * Run once on startup (after a 15s delay)
         */

        setTimeout(async () => {
            console.log("Running Startup Automated Expiry Check...");
            await this.processExpirations();
        }, 15000);
    }

    private async processExpirations() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            /**
             *  Find memberships where status is ACTIVE but date passed today
             */

            const expiredMemberships = await MembershipModel.updateMany(
                {
                    status: 'ACTIVE',
                    expiryDate: { $lt: today },
                    isDeleted: false
                },
                { $set: { status: 'EXPIRED' } }
            );

            if (expiredMemberships.modifiedCount > 0) {
                console.log(`[ExpiryJob] Expired ${expiredMemberships.modifiedCount} client memberships`);
            }

            /**
             * Find gyms where status is NOT 'Expired' but expiryDate passed today
             */
            const expiredGyms = await GymModel.updateMany(
                {
                    subscriptionStatus: { $in: ['Active', 'Trial', 'Pending'] },
                    expiryDate: { $lt: today }
                },
                { $set: { subscriptionStatus: 'Expired' } }
            );

            if (expiredGyms.modifiedCount > 0) {
                console.log(`[ExpiryJob] Expired ${expiredGyms.modifiedCount} gym subscriptions`);
            }

        } catch (error) {
            console.error("Critical error in AutomatedExpiryCronService:", error);
        }
    }
}
