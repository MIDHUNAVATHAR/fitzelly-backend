import { IEmailService } from "../../domain/services/IEmailService";
import { emailQueue } from "../queue/EmailQueue";
import { logger } from "../logger/logger";

export class QueuedMailService implements IEmailService {

    async sendOtp(to: string, otp: string): Promise<void> {
        await emailQueue.add(`otp_${to}`, {
            type: 'OTP',
            payload: { to, otp }
        }, {
            removeOnComplete: true,
            attempts: 3,
            backoff: { type: 'exponential', delay: 2000 }
        });

        logger.info(`[QueuedMailService] OTP job added to queue for ${to}`);
    }

    async sendWelcomeInvite(email: string, inviteLink: string, gymName: string, userName: string): Promise<void> {
        await emailQueue.add(`invite_${email}`, {
            type: 'WELCOME_INVITE',
            payload: { email, inviteLink, gymName, userName }
        }, {
            removeOnComplete: true,
            attempts: 5,
            backoff: { type: 'exponential', delay: 5000 }
        });

        logger.info(`[QueuedMailService] Welcome email job added to queue for ${email}`);
    }

}
