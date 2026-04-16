import { ClientProfileDTO,UpdateClientProfileRequestDTO } from "../../dtos/client-profile/ClientProfileDTO";


export interface IUpdateClientProfileUseCase {
    execute(clientId: string, data: UpdateClientProfileRequestDTO): Promise<ClientProfileDTO>;
}
