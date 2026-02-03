import nodemailer from "nodemailer"
import { IEmailService } from "../../domain/services/IEmailService";
import { logger } from "../logger/logger";

export class MailServiceImpl implements IEmailService {
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

            throw new Error("Email send failed");

        }
    }
}