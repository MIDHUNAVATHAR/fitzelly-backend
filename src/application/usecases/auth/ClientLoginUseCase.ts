import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IPasswordHasher } from "../../../domain/services/IPasswordHasher";
import { ITokenService } from "../../../domain/services/ITokenService";
import { ClientLoginRequestDTO, ClientLoginResponseDTO } from "../../dtos/auth/ClientLoginDTO";
import { AuthenticationFailedError, NotFoundError } from "../../errors/AppError";
import { ROLES } from "../../../constants/roles.constants";
import { IClientLoginUseCase } from "../../IUseCases/auth/IClientLoginUseCase";
import {  EmailNotVerifiedError } from "../../../domain/errors/DomainError";


export class ClientLoginUseCase implements IClientLoginUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _passwordHasher: IPasswordHasher,
        private _tokenService: ITokenService
    ) { }

    async execute(data: ClientLoginRequestDTO): Promise<ClientLoginResponseDTO> {

        const client = await this._clientRepository.findByEmail(data.email);

        if (!client) {
            throw new NotFoundError("Client");
        }

       
        if (!client.isEmailVerified) {
            throw new EmailNotVerifiedError(client.email)

        }

        if (!client.password) {
            throw new AuthenticationFailedError();
        }

        const isPasswordValid = await this._passwordHasher.compare(data.password, client.password);
        if (!isPasswordValid) {

            throw new AuthenticationFailedError();
        }

        const payload = {
            id: client.id,
            email: client.email,
            role: ROLES.CLIENT
        }

        const accessToken = this._tokenService.generateAccessToken(payload);
        const refreshToken = this._tokenService.generateRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            client: {
                id: client.id,
                email: client.email,
                role: ROLES.CLIENT
            }
        }
    }
}