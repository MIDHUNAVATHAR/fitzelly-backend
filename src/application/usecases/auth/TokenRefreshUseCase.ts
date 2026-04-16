import { ITokenService } from "../../../domain/services/ITokenService";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";
import { ISuperAdminRepository } from "../../../domain/repositories/ISuperAdminRepository";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ITrainerRepository } from "../../../domain/repositories/ITrainerRepository";
import { ISessionRepository } from "../../../domain/repositories/ISessionRepository";
import { AuthenticationFailedError } from "../../errors/AppError";
import { TokenRefreshResponseDTO, TokenRefreshRequestDTO } from "../../dtos/auth/TokenRefreshDTO";
import { ROLES } from "../../../constants/roles.constants";
import { ITokenRefreshUseCase } from "../../IUseCases/auth/ITokenRefreshUseCase";


export class TokenRefreshUseCase implements ITokenRefreshUseCase {
    constructor(
        private _tokenService: ITokenService,
        private _gymRepository: IGymRepository,
        private _superAdminRepository: ISuperAdminRepository,
        private _clientRepository: IClientRepository,
        private _trainerRepository: ITrainerRepository,
        private _sessionRepository: ISessionRepository
    ) { }

    async execute(request: TokenRefreshRequestDTO): Promise<TokenRefreshResponseDTO> {
        if (!request.refreshToken) {
            throw new AuthenticationFailedError("Refresh token missing");
        }
        let payload;
        try {
            payload = this._tokenService.verifyRefreshToken(request.refreshToken);
        } catch {
            throw new AuthenticationFailedError("Token expired");
        }

        // Check session validity
        if (payload.sessionId) {
            const isActive = await this._sessionRepository.isSessionActive(payload.sessionId);
            if (!isActive) {
                throw new AuthenticationFailedError("Session expired or revoked");
            }
        }

        let user = null
        if (payload.role == ROLES.GYM) {
            user = await this._gymRepository.findById(payload.id);
        } else if (payload.role == ROLES.SUPERADMIN) {
            user = await this._superAdminRepository.findById(payload.id);
        } else if (payload.role == ROLES.CLIENT) {
            user = await this._clientRepository.findById(payload.id);
        } else if (payload.role == ROLES.TRAINER) {
            user = await this._trainerRepository.findById(payload.id);
        }


        if (!user) {
            throw new AuthenticationFailedError("User cannot find")
        }


        const accessToken = this._tokenService.generateAccessToken({
            id: payload.id,
            email: payload.email,
            role: payload.role,
            gymId: payload.gymId,
            sessionId: payload.sessionId
        })

        return { accessToken, user: payload };
    }
}