import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { IEmailService } from "../../../domain/services/IEmailService";
import { ISendWelcomeEmailUseCase } from "../../IUseCases/invite/ISendWelcomeEmailUseCase";
import { NotFoundError, ServiceUnavailableError } from "../../errors/AppError";


export class SendWelcomeEmailUseCase implements ISendWelcomeEmailUseCase {
    constructor(
        private gymRepository: IGymRepository,
        private otpRepository: IOtpRepository,
        private emailService: IEmailService
    ) { }


    async execute(userId: string, email: string, name: string, gymId: string, urlPrefix: string): Promise<void> {
        const gym = await this.gymRepository.findById(gymId);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        /**
         * 1 hour
         */
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await this.otpRepository.upsertOtp(email, otp, expiresAt, userId);

        const inviteLink = `${urlPrefix}&otp=${otp}`;

        try {
            await this.emailService.sendWelcomeInvite(email, inviteLink, gym?.gymName || "Our Gym", name);
        } catch (error) {
            throw new ServiceUnavailableError("Failed to send welcome email");
        }
    }
}