import cron from 'node-cron';
import { MembershipModel } from '../database/mongoose/models/MembershipModel';
import { GymModel } from '../database/mongoose/models/GymModel';
import { clientModel } from '../database/mongoose/models/ClientModel';
import { QueuedMailService } from './QueuedMailService';

export class AutomatedExpiryCronService {
    private _mailService: QueuedMailService;
    constructor() {
        this._mailService = new QueuedMailService();
    }

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
             * 1. Handle Membership Expiry Reminders (3 days before)
             */
            const threeDaysFromNow = new Date(today);
            threeDaysFromNow.setDate(today.getDate() + 3);
            const nextDayAfterThree = new Date(threeDaysFromNow);
            nextDayAfterThree.setDate(threeDaysFromNow.getDate() + 1);

            const membershipsToRemind = await MembershipModel.find({
                status: 'ACTIVE',
                planType: 'CATEGORY_BASED',
                expiryDate: { $gte: threeDaysFromNow, $lt: nextDayAfterThree },
                isDeleted: false
            });

            for (const m of membershipsToRemind) {
                const client = await clientModel.findById(m.clientId);
                if (client?.email) {
                    await this._mailService.sendMembershipExpiryReminder(
                        client.email,
                        m.clientName,
                        m.expiryDate!.toLocaleDateString(),
                        m.planName
                    );
                }
            }

            /**
             * 2. Handle Membership Expirations and Notifications
             */
            const membershipsToExpire = await MembershipModel.find({
                status: 'ACTIVE',
                expiryDate: { $lt: today },
                isDeleted: false
            });

            if (membershipsToExpire.length > 0) {
                await MembershipModel.updateMany(
                    { _id: { $in: membershipsToExpire.map(m => m._id) } },
                    { $set: { status: 'EXPIRED' } }
                );

                for (const m of membershipsToExpire) {
                    // Send notification 

                    const client = await clientModel.findById(m.clientId);
                    if (client?.email) {
                        await this._mailService.sendMembershipExpiredNotification(
                            client.email,
                            m.clientName,
                            m.planName
                        );
                    }

                }
                console.log(`[ExpiryJob] Expired ${membershipsToExpire.length} client memberships`);
            }

            /**
             * 3. Find gyms where status is NOT 'Expired' but expiryDate passed today
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
