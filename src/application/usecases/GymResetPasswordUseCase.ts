import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { ResetPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";
import { AuthenticationFailedError, InvalidOtpError, ServiceUnavailableError } from "../errors/AppError";
import { IResetPasswordUseCase } from "../IUseCases/IResetPasswordUseCase";


export class GymResetPasswordUseCase implements IResetPasswordUseCase {
    constructor(private _gymRepository: IGymRepository, private _passwordHasher: IPasswordHasher, private _otpRepository: IOtpRepository) { }

    async execute(request: ResetPasswordRequestDTO): Promise<void> {
        const gym = await this._gymRepository.findByEmail(request.email)
        if (!gym) {
            throw new AuthenticationFailedError("Email not exists");
        }

        const isOtpValid = await this._otpRepository.verifyOtp(request.email, request.otp);
        if (!isOtpValid) {
            throw new InvalidOtpError("Invalid otp");
        }

        //hash new password
        const newpassword = await this._passwordHasher.hash(request.password);

        try {
            await this._gymRepository.updatePassword(request.email, newpassword);
        } catch (error) {
            throw new ServiceUnavailableError("unable to reset password. please try again");
        }
    }
}