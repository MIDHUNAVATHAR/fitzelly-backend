
export interface IOtpRepository {
    upsertOtp(email: string, otp: string, expiresAt: Date, userId?: string): Promise<void>;
    verifyOtp(email: string, otp: string, userId?: string): Promise<boolean>;
}