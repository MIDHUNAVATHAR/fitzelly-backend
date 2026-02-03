import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { OtpModel } from "../database/mongoose/models/OtpModel";

export class OtpRepositoryImpl implements IOtpRepository {
    async upsertOtp(email: string, otp: string, expiresAt: Date): Promise<void> {
        await OtpModel.findOneAndUpdate({ email }, { otp, expiresAt }, { upsert: true })
    }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const otpRecord = await OtpModel.findOne({email});
        if(!otpRecord) return false;
        return otpRecord.otp == otp; 
    }
}


