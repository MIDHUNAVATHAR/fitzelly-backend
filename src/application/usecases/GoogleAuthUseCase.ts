import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { ITokenService } from "../../domain/services/ITokenService";
import { IGoogleAuthUseCase } from "../IUseCases/IGoogleAuthUseCase";
import { IGoogleAuthService } from "../../domain/services/IGoogleAuthService";
import { Gym } from "../../domain/entities/Gym";
import { AuthenticationFailedError } from "../errors/AppError";


export class GoogleAuthUseCase implements IGoogleAuthUseCase {
    constructor(
        private gymRepository: IGymRepository,
        private tokenService: ITokenService,
        private googleAuthService: IGoogleAuthService
    ) { }

    async execute(code: string, role: string, mode: "login" | "signup"):
        Promise<{ refreshToken: string }> {

        const email = await this.googleAuthService.getGoogleEmail(code);

        let user = null;

        if (role === "gym") {
            user = await this.gymRepository.findByEmail(email);
        }

        if (!user) {
            if (mode === "login") {
                throw new AuthenticationFailedError("Account not found")
            } else if (mode === "signup") {
                const randomPassword = Math.random().toString(36).slice(-8);

                const newGym = new Gym("", email, randomPassword, role);
                user = await this.gymRepository.create(newGym);
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