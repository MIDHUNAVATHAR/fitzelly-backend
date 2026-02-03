import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import { ITokenService } from "../../domain/services/ITokenService";
import { LoginRequestDTO, LoginResponseDTO } from "../dtos/LoginDTO";
import { ILoginUseCase } from "../IUseCases/ILoginUseCase";
import { GymLoginMapper } from "../mappers/GymLoginMapper";
import { AuthenticationFailedError } from "../errors/AppError";


export class GymLoginUseCase implements ILoginUseCase {
    constructor(
        private _userRepository: IGymRepository,
        private _passwordHasher: IPasswordHasher,
        private _tokenService: ITokenService
    ) { }

    async execute(request: LoginRequestDTO): Promise<LoginResponseDTO> {
        const user = await this._userRepository.findByEmail(request.email);
        if (!user) {
            throw new AuthenticationFailedError("Email not exists")
        }

        const isPasswordMatch = await this._passwordHasher.compare(request.password, user.password)
        if (!isPasswordMatch) {
            throw new AuthenticationFailedError("Password Mismatch");
        }

        const payload = { id: user.id, email: user.email, role: user.role };

        const accessToken = this._tokenService.generateAccessToken(payload)
        const refreshToken = this._tokenService.generateRefreshToken(payload)

        return GymLoginMapper.toDTO(user, accessToken, refreshToken);
    }
}