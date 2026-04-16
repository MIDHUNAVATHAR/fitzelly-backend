import { UpdateClientByGymRequestDTO, GetClientResponseDTO } from "../../dtos/gym-client/ClientDTO"

export interface IUpdateClientByGymUseCase {

    execute(clientId: string, clientData: UpdateClientByGymRequestDTO): Promise<GetClientResponseDTO>
}