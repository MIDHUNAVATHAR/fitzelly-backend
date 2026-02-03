import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { IEmailService } from "../../domain/services/IEmailService";
import { ForgotPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";
import { IInitiateForgotPasswordUseCase } from "../IUseCases/IInitiateForgotpassUseCase";
import { AuthenticationFailedError, ServiceUnavailableError } from "../errors/AppError";


export class GymInitiateForgotpassUseCase implements IInitiateForgotPasswordUseCase {

    constructor(private _gymRepository: IGymRepository, private _otpRepository: IOtpRepository, private _emailService: IEmailService) { }

    async execute(request: ForgotPasswordRequestDTO): Promise<void> {
        const gym = await this._gymRepository.findByEmail(request.email);
        if (!gym) {
            throw new AuthenticationFailedError("Invalid Email");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await this._otpRepository.upsertOtp(request.email, otp, expiresAt)

        try {
            await this._emailService.sendOtp(request.email, otp);
        } catch (error) {
            throw new ServiceUnavailableError("Unable to send otp, please try again later")
        }

    }
}