import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { IEmailService } from "../../../domain/services/IEmailService";
import { ISendWelcomeEmailUseCase } from "../../IUseCases/invite/ISendWelcomeEmailUseCase";
import { ConflictError, ForbiddenError, NotFoundError, ServiceUnavailableError } from "../../errors/AppError";
import { IGetRepoByUserType } from "../../interfaces/IGetRepoByUserType";


export class SendWelcomeEmailUseCase implements ISendWelcomeEmailUseCase {
    constructor(
        private getRepoByUserType: IGetRepoByUserType,
        private gymRepository: IGymRepository,
        private otpRepository: IOtpRepository,
        private emailService: IEmailService
    ) { }


    async execute(params: { userId: string; gymId: string; role: "client" | "trainer"; }): Promise<void> {
        const repo = this.getRepoByUserType.getRepo(params.role);
        if (!repo) {
            throw new Error("Invalid repository for role");
        }
        const user = await repo.findById(params.userId);
        const gym = await this.gymRepository.findById(params.gymId);

        if (!gym) {
            throw new NotFoundError("Gym not found")
        }

        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.gymId !== params.gymId) {
            throw new ForbiddenError("Access denied");
        }
        if (user.isEmailVerified) {
            throw new ConflictError("Already verified")
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000) //1 hr

        await this.otpRepository.upsertOtp(user.email, otp, expiresAt, user.id);

        const frontendUrl = process.env.FRONTEND_URL;
        const urlPrefix = `${frontendUrl}/create-password?type=${params.role}&id=${params.userId}`;
        const inviteLink = `${urlPrefix}&otp=${otp}`;

        try {
            await this.emailService.sendWelcomeInvite(user.email, inviteLink, gym.gymName || "Our Gym", user.fullName);
        } catch {
            throw new ServiceUnavailableError("Failed to send welcome email");
        }

    }
}