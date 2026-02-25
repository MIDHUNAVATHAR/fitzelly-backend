import { ClientLoginRequestDTO, ClientLoginResponseDTO } from "../../dtos/auth/ClientLoginDTO";

export interface IClientLoginUseCase {
    execute(data: ClientLoginRequestDTO): Promise<ClientLoginResponseDTO>;
}