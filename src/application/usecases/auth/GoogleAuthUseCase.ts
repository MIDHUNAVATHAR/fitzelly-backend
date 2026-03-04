import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { ITokenService } from "../../../domain/services/ITokenService";
import { IGoogleAuthUseCase } from "../../IUseCases/auth/IGoogleAuthUseCase";
import { IGoogleAuthService } from "../../../domain/services/IGoogleAuthService";
import { Gym } from "../../../domain/entities/Gym";
import { AuthenticationFailedError } from "../../errors/AppError";

export class GoogleAuthUseCase implements IGoogleAuthUseCase {
    constructor(
        private gymRepository: IGymRepository,
        private clientRepository: IClientRepository,
        private trainerRepository: ITrainerRepository,
        private tokenService: ITokenService,
        private googleAuthService: IGoogleAuthService
    ) { }

    async execute(code: string, role: string):
        Promise<{ refreshToken: string }> {

        const email = await this.googleAuthService.getGoogleEmail(code);

        let user: any = null;

        if (role === "gym") {
            user = await this.gymRepository.findByEmail(email);
        } else if (role === "client") {
            user = await this.clientRepository.findByEmail(email);
        } else if (role === "trainer") {
            user = await this.trainerRepository.findByEmail(email);
        }
        if (!user) {
            if (role === "gym") {
                const randomPassword = Math.random().toString(36).slice(-8);
                const newGym = new Gym("", email, randomPassword, role);
                user = await this.gymRepository.create(newGym);
            } else {
                throw new AuthenticationFailedError(`Account not found for ${role}. Please request an invite from a Gym.`);
            }
        }

        if (!user) {
            throw new AuthenticationFailedError("Failed to authenticate user")
        }

        const refreshToken = this.tokenService.generateRefreshToken({
            id: user.id,
            email: user.email,
            role: role
        })

        return { refreshToken };
    }
}