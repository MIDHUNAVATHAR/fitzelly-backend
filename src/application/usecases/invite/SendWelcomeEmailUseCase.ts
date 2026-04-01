import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { IOtpRepository } from "../../../domain/repositories/IOtpRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { IEmailService } from "../../../domain/services/IEmailService";
import { ISendWelcomeEmailUseCase } from "../../IUseCases/invite/ISendWelcomeEmailUseCase";
import { ConflictError, ForbiddenError, NotFoundError, ServiceUnavailableError } from "../../errors/AppError";


export class SendWelcomeEmailUseCase implements ISendWelcomeEmailUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _trainerRepository: ITrainerRepository,
        private _gymRepository: IGymRepository,
        private _otpRepository: IOtpRepository,
        private _emailService: IEmailService
    ) { }


    async execute(params: { userId: string; gymId: string; role: "client" | "trainer"; }): Promise<void> {
        const repo = params.role == "client" ? this._clientRepository : this._trainerRepository
        if (!repo) {
            throw new Error("Invalid repository for role");
        }
        const user = await repo.findById(params.userId);
        const gym = await this._gymRepository.findById(params.gymId);

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

        await this._otpRepository.upsertOtp(user.email, otp, expiresAt, user.id);

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const urlPrefix = `${frontendUrl}/create-password?type=${params.role}&id=${params.userId}`;
        const inviteLink = `${urlPrefix}&otp=${otp}`;

        try {
            await this._emailService.sendWelcomeInvite(user.email, inviteLink, gym.gymName || "Our Gym", user.fullName);
        } catch (error) {
            console.error("Welcome email failed to queue:", error);
            throw new ServiceUnavailableError("Failed to send welcome email");
        }

    }
}