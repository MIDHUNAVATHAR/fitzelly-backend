import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { CompleteForgotPasswordRequestDTO } from "../dtos/ForgotPasswordDTO";
import { InvalidOtpError } from "../../../../shared/errors/AppError";
import { ICompleteForgotpassUseCase } from "../interfaces/ICompleteForgotpassUseCase";


export class SuperAdminCompleteForgotpassUseCase implements ICompleteForgotpassUseCase {
    constructor(
        private _otpRepository: IOtpRepository
    ) { }

    async execute(request: CompleteForgotPasswordRequestDTO): Promise<void> {
        /**
         * verify otp is valid
         */
        const isValid = await this._otpRepository.verifyOtp(request.email, request.otp);
        if (!isValid) {
            throw new InvalidOtpError("Invalid Otp")
        }
    }
}