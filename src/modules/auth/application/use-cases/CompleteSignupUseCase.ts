import { ICompleteSignupUseCase } from "../interfaces/ICompleteSignupUseCase";
import { IGymRepository } from "../../../gyms/domain/repositories/IGymRepository";
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { IPasswordHasher } from "../../../../shared/services/IPasswordHasher";
import { CompleteSignupRequestDTO } from "../dtos/CompleteSignupDTO";
import { GymSignupMapper } from "../mappers/CompleteSignupMapper";

import { InvalidOtpError, ConflictError } from "../../../../shared/errors/AppError";



export class CompleteSignupUseCase implements ICompleteSignupUseCase {
    constructor(
        private _gymRepository: IGymRepository,
        private _otpRepository: IOtpRepository,
        private _passwordHasher: IPasswordHasher
    ) { }

    async execute(request: CompleteSignupRequestDTO): Promise<void> {
        /**
         * verify otp
         */
        const isOtpValid = await this._otpRepository.verifyOtp(request.email, request.otp);
        if (!isOtpValid) {
            throw new InvalidOtpError();
        }

        /**
         * check email exists
         */
        const existingGym = await this._gymRepository.findByEmail(request.email);
        if (existingGym) {
            throw new ConflictError("Email already exists");
        }

        /**
         * hash password
         */
        const hashedPassword = await this._passwordHasher.hash(request.password);

        const gymToCreate = GymSignupMapper.toEntity(request, hashedPassword);

        await this._gymRepository.create(gymToCreate);

    }
}