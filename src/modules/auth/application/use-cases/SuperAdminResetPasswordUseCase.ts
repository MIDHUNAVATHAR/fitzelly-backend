import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { ISuperAdminRepository } from "../../../analytics/domain/repositories/ISuperAdminRepository";
import { IPasswordHasher } from "../../../../shared/services/IPasswordHasher";
import { ResetPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";
import { AuthenticationFailedError, InvalidOtpError } from "../../../../shared/errors/AppError";
import { IResetPasswordUseCase } from "../interfaces/IResetPasswordUseCase";


export class SuperAdminResetPasswordUseCase implements IResetPasswordUseCase {
    constructor(
        private _superAdminRepository: ISuperAdminRepository,
        private _otpRepository: IOtpRepository,
        private _passwordHasher: IPasswordHasher
    ) { }

    async execute(request: ResetPasswordRequestDTO): Promise<void> {
        const superAdmin = await this._superAdminRepository.findByEmail(request.email);
        if (!superAdmin) {
            throw new AuthenticationFailedError("Email not exists");
        }

        const isOtpValid = await this._otpRepository.verifyOtp(request.email, request.otp);
        if (!isOtpValid) {
            throw new InvalidOtpError("Invalid Otp");
        }

        const newPassword = await this._passwordHasher.hash(request.password);

        await this._superAdminRepository.updatePassword(request.email, newPassword);
    }
}