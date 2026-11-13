import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { ITrainerRepository } from "../../../trainers/domain/repositories/ITrainerRepository";
import { IEmailService } from "../../../../shared/services/IEmailService";
import { ForgotPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";
import { AuthenticationFailedError, ServiceUnavailableError } from "../../../../shared/errors/AppError";
import { IInitiateForgotPasswordUseCase } from "../interfaces/IInitiateForgotpassUseCase";



export class TrainerInitiateForgotpassUseCase implements IInitiateForgotPasswordUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository,
        private _otpRepository: IOtpRepository,
        private _emailService: IEmailService
    ) { }

    async execute(request: ForgotPasswordRequestDTO): Promise<void> {
        const trainer = await this._trainerRepository.findByEmail(request.email);
        if (!trainer) {
            throw new AuthenticationFailedError("Invalid Email");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await this._otpRepository.upsertOtp(request.email, otp, expiresAt);

        try {
            await this._emailService.sendOtp(request.email, otp)
        } catch {
            throw new ServiceUnavailableError("Unable to send otp, please try again later")
        }
    }
}