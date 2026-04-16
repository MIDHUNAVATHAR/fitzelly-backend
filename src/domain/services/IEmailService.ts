export interface IEmailService {
    sendOtp(to: string, otp: string): Promise<void>;
    sendWelcomeInvite(email: string, inviteLink: string, gymName: string, userName: string): Promise<void>;
    sendMembershipExpiryReminder(to: string, clientName: string, expiryDate: string, planName: string): Promise<void>;
    sendMembershipExpiredNotification(to: string, clientName: string, planName: string): Promise<void>;
}