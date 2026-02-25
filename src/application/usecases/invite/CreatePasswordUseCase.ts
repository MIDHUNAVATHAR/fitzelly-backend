import { ICreatePasswordUseCase } from "../../IUseCases/invite/ICreatePasswordUseCase";
import { CreatePasswordDTO } from "../../dtos/invite/CreatePasswordDTO";
import { IGetRepoByUserType } from "../../interfaces/IGetRepoByUserType";
import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { NotFoundError, BadRequestError } from "../../errors/AppError";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";


export class CreatePasswordUseCase implements ICreatePasswordUseCase {
    constructor(
        private repoGetter: IGetRepoByUserType,
        private otpRepository: IOtpRepository,
        private passwordHasher: IPasswordHasher
    ) { }

    async execute(data: CreatePasswordDTO): Promise<void> {
        const repo = this.repoGetter.getRepo(data.userType);

        const user = await repo.findById(data.userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const isValidOtp = await this.otpRepository.verifyOtp(user.email, data.otp, data.userId);

        if (!isValidOtp) {
            throw new BadRequestError("Invalid or expired OTP");
        }

        const passwordHash = await this.passwordHasher.hash(data.password);

        await repo.setPassword(user.id, passwordHash);
    }
}