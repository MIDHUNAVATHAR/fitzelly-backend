import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { ResetPasswordRequestDTO } from "../../dtos/auth/ForgotPasswordDTO";
import { AuthenticationFailedError, InvalidOtpError, ServiceUnavailableError } from "../../errors/AppError";
import { IResetPasswordUseCase } from "../../IUseCases/auth/IResetPasswordUseCase";


export class ClientResetPasswordUseCase implements IResetPasswordUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _passwordHasher: IPasswordHasher,
        private _otpRepository: IOtpRepository
    ) { }

    async execute(request: ResetPasswordRequestDTO): Promise<void> {
        const client = await this._clientRepository.findByEmail(request.email);
        if (!client) {
            throw new AuthenticationFailedError("Email not exists");
        }

        const isOtpValid = await this._otpRepository.verifyOtp(request.email, request.otp);
        if (!isOtpValid) {
            throw new InvalidOtpError("Invalid otp")
        }

        const newPassword = await this._passwordHasher.hash(request.password);

        try {
            await this._clientRepository.setPassword(client.id, newPassword)
        } catch {
            throw new ServiceUnavailableError("unable to reset password. please try again")
        }
    }
}