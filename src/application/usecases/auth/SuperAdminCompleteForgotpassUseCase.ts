import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { CompleteForgotPasswordRequestDTO } from "../../dtos/auth/ForgotPasswordDTO";
import { InvalidOtpError } from "../../errors/AppError";
import { ICompleteForgotpassUseCase } from "../../IUseCases/auth/ICompleteForgotpassUseCase";


export class SuperAdminCompleteForgotpassUseCase implements ICompleteForgotpassUseCase {
    constructor(
        private _otpRepository: IOtpRepository
    ) { }

    async execute(request: CompleteForgotPasswordRequestDTO): Promise<void> {
        const isValid = await this._otpRepository.verifyOtp(request.email, request.otp);
        if (!isValid) {
            throw new InvalidOtpError("Invalid Otp")
        }
    }
}