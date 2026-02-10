import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { IEmailService } from "../../domain/services/IEmailService";
import { logger } from "../../infrastructure/logger/logger";
import { InitiateSignupRequestDTO } from "../dtos/InitiateSignupDTO";
import { ConflictError, ServiceUnavailableError } from "../errors/AppError";
import { IInitiateSignupUseCase } from "../IUseCases/IInitiateSignupUseCase";

export class InitiateSignupUseCase implements IInitiateSignupUseCase {
    constructor(
        private _gymRepository: IGymRepository,
        private _otpRepository: IOtpRepository,
        private _emailService: IEmailService
    ) { }

    async execute(request: InitiateSignupRequestDTO): Promise<void> {

        //check email already registered
        logger.debug(request.email)
        const existingGym = await this._gymRepository.findByEmail(request.email)
        if (existingGym) {
            throw new ConflictError("Email already exists");
        }

        //generate otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);//5 minutes

        //save otp
        await this._otpRepository.upsertOtp(request.email, otp, expiresAt);

        //send email
        try {
            await this._emailService.sendOtp(request.email, otp);

        } catch {
            throw new ServiceUnavailableError("unable to send otp, plaase try again later")
        }
    }
}

