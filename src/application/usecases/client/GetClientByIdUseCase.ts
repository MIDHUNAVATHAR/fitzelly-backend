import { GetClientResponseDTO } from "../../dtos/ClientDTO";
import { IGetClientByIdUseCase } from "../../IUseCases/client/IGetClientByIdUseCase";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ClientMapper } from "../../mapper/ClientMapper";
import { NotFoundError } from "../../errors/AppError";

export class GetClientByIdUseCase implements IGetClientByIdUseCase {
    constructor(
        private _clientRepository: IClientRepository
    ) { }

    async execute(clientId: string, gymId: string): Promise<GetClientResponseDTO> {
        const client = await this._clientRepository.findById(clientId);

        if (!client || client.isDeleted || client.gymId !== gymId) {
            throw new NotFoundError("Client not found");
        }
        return ClientMapper.toGetClientResponseDTO(client);
    }
}