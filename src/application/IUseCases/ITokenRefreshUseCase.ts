import { TokenRefreshResponseDTO, TokenRefreshRequestDTO } from "../dtos/TokenRefreshDTO"

export interface ITokenRefreshUseCase {
    execute(request: TokenRefreshRequestDTO):Promise<TokenRefreshResponseDTO>;
}