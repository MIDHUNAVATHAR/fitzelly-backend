import { GetClientResponseDTO } from "../../dtos/ClientDTO";
import { IGetClientsUseCase } from "../../IUseCases/client/IGetClientsUseCase";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ClientMapper } from "../../mapper/ClientMapper";


export class GetClientsUseCase implements IGetClientsUseCase {
    constructor(
        private _clientRepository: IClientRepository
    ) { }

    async execute(gymId: string, page: number, search?: string): Promise<{
        clients: GetClientResponseDTO[];
        total: number;
        page: number;
        limit: number;
    }> {

        const limit = 10;
        const skip = (page - 1) * limit;

        const { clients, total } = await this._clientRepository.getClientsByGymId(gymId, skip, limit, search);

        const result = clients.map(client => {
            return ClientMapper.toGetClientResponseDTO(client)
        })

        return {
            clients:result,
            total,
            page,
            limit
        }
    }
}