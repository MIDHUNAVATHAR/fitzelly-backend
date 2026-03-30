import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IEmailService } from "../../../domain/services/IEmailService";
import { IInitiateForgotPasswordUseCase } from "../../IUseCases/auth/IInitiateForgotpassUseCase";
import { ForgotPasswordRequestDTO } from "../../dtos/auth/ForgotPasswordDTO";
import { AuthenticationFailedError, NotFoundError, ServiceUnavailableError } from "../../errors/AppError";


export class ClientInitiateForgotpassUseCase implements IInitiateForgotPasswordUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _otpRepository: IOtpRepository,
        private _emailService: IEmailService
    ) { }

    async execute(request: ForgotPasswordRequestDTO): Promise<void> {
        const client = await this._clientRepository.findByEmail(request.email);
        if (!client) {
            throw new AuthenticationFailedError("invalid email")
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await this._otpRepository.upsertOtp(request.email, otp, expiresAt);

        try {
            await this._emailService.sendOtp(request.email, otp)
        } catch {
            throw new ServiceUnavailableError("Unable to send otp, please try again later.")
        }
    }
}