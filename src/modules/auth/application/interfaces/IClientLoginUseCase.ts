import { ClientLoginRequestDTO, ClientLoginResponseDTO } from "../dtos/ClientLoginDTO";

export interface IClientLoginUseCase {
    execute(data: ClientLoginRequestDTO): Promise<ClientLoginResponseDTO>;
}