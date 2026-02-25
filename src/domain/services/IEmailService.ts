export interface IEmailService {
    sendOtp(to: string, otp: string): Promise<void>;
    sendWelcomeInvite(email: string, inviteLink: string, gymName: string, userName: string): Promise<void>;
}