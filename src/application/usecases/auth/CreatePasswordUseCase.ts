import { ICreatePasswordUseCase } from "../../IUseCases/auth/ICreatePasswordUseCase";
import { CreatePasswordDTO } from "../../dtos/auth/CreatePasswordDTO";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { NotFoundError, BadRequestError } from "../../errors/AppError";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";


export class CreatePasswordUseCase implements ICreatePasswordUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _trainerRepository: ITrainerRepository,
        private _otpRepository: IOtpRepository,
        private _passwordHasher: IPasswordHasher
    ) { }

    async execute(data: CreatePasswordDTO): Promise<void> {
        const repo = data.userType == "client" ? this._clientRepository : this._trainerRepository

        const user = await repo.findById(data.userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const isValidOtp = await this._otpRepository.verifyOtp(user.email, data.otp, data.userId);

        if (!isValidOtp) {
            throw new BadRequestError("Invalid or expired OTP");
        }

        const passwordHash = await this._passwordHasher.hash(data.password);

        await repo.setPassword(user.id, passwordHash);
    }
}