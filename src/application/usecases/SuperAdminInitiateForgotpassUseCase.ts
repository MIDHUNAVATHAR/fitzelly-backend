import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { ISuperAdminRepository } from "../../domain/repositories/ISuperAdminRepository";
import { IEmailService } from "../../domain/services/IEmailService";
import { ForgotPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";
import { AuthenticationFailedError, ServiceUnavailableError } from "../errors/AppError";
import { IInitiateForgotPasswordUseCase } from "../IUseCases/IInitiateForgotpassUseCase";



export class SuperAdminInitiateForgotpassUseCase implements IInitiateForgotPasswordUseCase {
    constructor(
        private _superAdminRepository: ISuperAdminRepository,
        private _otpRepository: IOtpRepository,
        private _emailService: IEmailService
    ) { }

    async execute(request: ForgotPasswordRequestDTO): Promise<void> {
        const superAdmin = await this._superAdminRepository.findByEmail(request.email);
        if (!superAdmin) {
            throw new AuthenticationFailedError("Invalid Email");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await this._otpRepository.upsertOtp(request.email, otp, expiresAt);

        try {
            await this._emailService.sendOtp(request.email, otp);
        } catch {
            throw new ServiceUnavailableError("unable to send otp, please try again later");
        }
    }
}