
export interface IOtpRepository {
    upsertOtp(email: string, otp: string, expiresAt: Date): Promise<void>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
}