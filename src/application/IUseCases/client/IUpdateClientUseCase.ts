import { UpdateClientByGymRequestDTO, GetClientResponseDTO } from "../../dtos/ClientDTO"

export interface IUpdateClientByGymUseCase {

    execute(clientId: string, clientData: UpdateClientByGymRequestDTO): Promise<GetClientResponseDTO>
}