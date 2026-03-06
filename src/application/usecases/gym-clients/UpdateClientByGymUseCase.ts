import { UpdateClientByGymRequestDTO, GetClientResponseDTO } from "../../dtos/gym-client/ClientDTO";
import { IUpdateClientByGymUseCase } from "../../IUseCases/gym-client/IUpdateClientUseCase";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { NotFoundError, BadRequestError } from "../../errors/AppError";
import { ClientMapper } from "../../mapper/ClientMapper";


export class UpdateClientByGymUseCase implements IUpdateClientByGymUseCase {
    constructor(
        private _clientRepository: IClientRepository
    ) { }
    async execute(clientId: string, clientData: UpdateClientByGymRequestDTO): Promise<GetClientResponseDTO> {
        const client = await this._clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundError("Client not found");
        }

        const isEmailVerified = await this._clientRepository.findVerifiedByEmail(clientData.email)

        if (isEmailVerified) {
            throw new BadRequestError("Cannot update verified email address");

        }

        const updatedClient = await this._clientRepository.updateClientByGym(clientId, clientData);
        return ClientMapper.toGetClientResponseDTO(updatedClient);
    }
}