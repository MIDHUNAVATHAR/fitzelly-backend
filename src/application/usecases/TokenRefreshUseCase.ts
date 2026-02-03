import { ITokenService } from "../../domain/services/ITokenService";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { AuthenticationFailedError } from "../errors/AppError";
import { TokenRefreshResponseDTO, TokenRefreshRequestDTO } from "../dtos/TokenRefreshDTO";
import { ROLES } from "../../constants/roles.constants";


export class TokenRefreshUseCase {
    constructor(
        private _tokenService: ITokenService,
        private _gymRepository: IGymRepository,

    ) { }

    async execute(request: TokenRefreshRequestDTO): Promise<TokenRefreshResponseDTO> {
        if (!request.refreshToken) {
            throw new AuthenticationFailedError("Refresh token missing");
        }

        let payload;
        try {
            payload = this._tokenService.verifyRefrshToken(request.refreshToken);
        } catch (error) {
            throw new AuthenticationFailedError("Token expired");
        }


        let user = null
        if (payload.role == ROLES.GYM) {
            user = await this._gymRepository.findById(payload.id);
        }

        if (!user) {
            throw new AuthenticationFailedError("User cannot find")
        }


        const accessToken = this._tokenService.generateAccessToken({
            id: payload.id,
            email: payload.email,
            role: payload.role
        })

        return { accessToken, user: payload };
    }
}