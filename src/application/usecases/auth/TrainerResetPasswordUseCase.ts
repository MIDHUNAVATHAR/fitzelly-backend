import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { ResetPasswordRequestDTO } from "../../dtos/auth/ForgotPasswordDTO";
import { InvalidOtpError, ServiceUnavailableError } from "../../errors/AppError";
import { IResetPasswordUseCase } from "../../IUseCases/auth/IResetPasswordUseCase";


export class TrainerResetPasswordUseCase implements IResetPasswordUseCase {
    constructor(
        private _trainerRepository: ITrainerRepository,
        private _passwordHasher: IPasswordHasher,
        private _otpRepository: IOtpRepository
    ) { }

    async execute(request: ResetPasswordRequestDTO): Promise<void> {
        const trainer = await this._trainerRepository.findByEmail(request.email);
        if (!trainer) {
            throw new InvalidOtpError("Invalid otp")
        }

        const isOtpValid = await this._otpRepository.verifyOtp(request.email, request.otp);
        if (!isOtpValid) {
            throw new InvalidOtpError("Invalid otp");
        }

        const newPassword = await this._passwordHasher.hash(request.password);

        try {
            await this._trainerRepository.setPassword(trainer.id, newPassword)
        } catch {
            throw new ServiceUnavailableError("unable to reset password. please try agian")
        }
    }
}