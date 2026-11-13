import { ClientProfileDTO,UpdateClientProfileRequestDTO } from "../dtos/ClientProfileDTO";


export interface IUpdateClientProfileUseCase {
    execute(clientId: string, data: UpdateClientProfileRequestDTO): Promise<ClientProfileDTO>;
}
