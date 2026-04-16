import { TokenRefreshResponseDTO, TokenRefreshRequestDTO } from "../../dtos/auth/TokenRefreshDTO"

export interface ITokenRefreshUseCase {
    execute(request: TokenRefreshRequestDTO): Promise<TokenRefreshResponseDTO>;
}