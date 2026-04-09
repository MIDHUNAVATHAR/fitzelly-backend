import nodemailer from "nodemailer"
import { IEmailService } from "../../domain/services/IEmailService";
import { logger } from "../logger/logger";
import { ServiceUnavailableError } from "../../domain/errors/ServiceUnavailableError";


export class MailService implements IEmailService {
    private transporter: nodemailer.Transporter | null = null;

    private getTransporter(): nodemailer.Transporter | null {
        if (this.transporter) return this.transporter;

        const user = process.env.MAIL_USER;
        const pass = process.env.MAIL_PASS;

        if (user && pass) {
            this.transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user, pass }
            })
            return this.transporter;
        }

        return null;
    }

    async sendOtp(to: string, otp: string) {
        const transporter = this.getTransporter();

        if (!transporter) {
            logger.warn("Running in DEV mode - no email credentials configured");
            logger.info(`OTP for ${to}: ${otp}`);
            return;
        }

        try {
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to,
                subject: 'Your FITZELLY Verification Code',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #008080;">Verify your Email</h2>
                        <p>Use the following code to complete your registration:</p>
                        <h1 style="letter-spacing: 5px; background: #f4f4f4; padding: 10px; display: inline-block;">${otp}</h1>
                        <p>This code expires in 5 minutes.</p>
                    </div>
                `
            });
            logger.info(`[MailService] OTP sent to ${to}`);
        } catch (error) {
            logger.error("[MailService] Failed to send email via SMTP. Falling back to console log for development.");
            logger.error(error);
            logger.debug(`[FALLBACK] OTP for ${to}: ${otp}`);

            throw new ServiceUnavailableError("Email Service");

        }
    }

    async sendWelcomeInvite(email: string, inviteLink: string, gymName: string, userName: string): Promise<void> {
        const transporter = this.getTransporter();

        if (!transporter) {
            logger.warn("Running in DEV mode - no email credentials configured");
            logger.info(`Invite link for ${email}: ${inviteLink}`);
            return;
        }

        try {
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: `Welcome to ${gymName} via FITZELLY`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #008080;">Welcome ${userName}!</h2>
                        <p>You have been invited to join <strong>${gymName}</strong> powered by Fitzelly.</p>
                        <p>Click the link below to create your password and set up your account:</p>
                        <br/>
                        <a href="${inviteLink}" style="background-color: #008080; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Create Your Password</a>
                        <br/><br/>
                        <p style="margin-top: 20px;">Or copy and paste this link into your browser:</p>
                        <p><a href="${inviteLink}">${inviteLink}</a></p>
                        <p style="color: #888; font-size: 12px; margin-top: 30px;">This invite link expires in 1 hour.</p>
                    </div>
                `
            });
            logger.info(`[MailService] Welcome email sent to ${email}`);
        } catch (error) {
            logger.error("[MailService] Failed to send email via SMTP.");
            logger.error(error);
            logger.debug(`[FALLBACK] Welcome Invite for ${email}: ${inviteLink}`);

            throw new ServiceUnavailableError("Email Service");
        }
    }

    async sendMembershipExpiryReminder(to: string, clientName: string, expiryDate: string, planName: string): Promise<void> {
        const transporter = this.getTransporter();

        if (!transporter) {
            logger.warn("Running in DEV mode - no email credentials configured");
            logger.info(`Reminder for ${to}: ${planName} expires on ${expiryDate}`);
            return;
        }

        try {
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to,
                subject: `Plan Expiry Reminder - FITZELLY`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                        <h2 style="color: #008080;">Hi ${clientName},</h2>
                        <p>Your <strong>${planName}</strong> plan membership will expire within <strong>3 days</strong>.</p>
                        <p>Expiry Date: <strong>${expiryDate}</strong></p>
                        <p>Please renew your plan to avoid any disruption in your fitness journey.</p>
                        <br/>
                        <p>Best regards,<br/>Team FITZELLY</p>
                    </div>
                `
            });
            logger.info(`[MailService] Expiry reminder sent to ${to}`);
        } catch (error) {
            logger.error("[MailService] Failed to send expiry reminder.");
            logger.error(error);
        }
    }

    async sendMembershipExpiredNotification(to: string, clientName: string, planName: string): Promise<void> {
        const transporter = this.getTransporter();

        if (!transporter) {
            logger.warn("Running in DEV mode - no email credentials configured");
            logger.info(`Expiry notification for ${to}: ${planName} expired`);
            return;
        }

        try {
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to,
                subject: `Plan Expired - FITZELLY`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                        <h2 style="color: #008080;">Hi ${clientName},</h2>
                        <p>Your <strong>${planName}</strong> plan membership has <strong>expired</strong> today.</p>
                        <p>We'd love to see you back at the gym. Please renew your membership to continue with your progress.</p>
                        <br/>
                        <p>Best regards,<br/>Team FITZELLY</p>
                    </div>
                `
            });
            logger.info(`[MailService] Expiration notice sent to ${to}`);
        } catch (error) {
            logger.error("[MailService] Failed to send expiration notice.");
            logger.error(error);
        }
    }
}