import { UpdateClientByGymRequestDTO, GetClientResponseDTO } from "../dtos/ClientDTO";
import { IUpdateClientByGymUseCase } from "../interfaces/IUpdateClientUseCase";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { NotFoundError, BadRequestError } from "../../../../shared/errors/AppError";
import { ClientMapper } from "../dtos/ClientMapper";
import { validateAge } from "../../../../shared/utils/validation.util";


export class UpdateClientByGymUseCase implements IUpdateClientByGymUseCase {
    constructor(
        private _clientRepository: IClientRepository
    ) { }
    async execute(clientId: string, clientData: UpdateClientByGymRequestDTO): Promise<GetClientResponseDTO> {
        const client = await this._clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundError("Client not found");
        }

        if (clientData.dateOfBirth) {
            const ageValidation = validateAge(clientData.dateOfBirth);
            if (!ageValidation.isValid) {
                throw new BadRequestError(ageValidation.message);
            }
        }

        if (clientData.email !== client.email) {
            const emailInUse = await this._clientRepository.findByEmail(clientData.email);
            if (emailInUse) {
                throw new BadRequestError("This email is already in use by another client.");
            }
        }

        const updatedClient = await this._clientRepository.updateClientByGym(clientId, clientData);
        return ClientMapper.toGetClientResponseDTO(updatedClient);
    }
}