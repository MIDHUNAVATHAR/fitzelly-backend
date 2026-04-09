import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { UpdateClientProfileRequestDTO, ClientProfileDTO } from "../../dtos/client-profile/ClientProfileDTO";
import { IUpdateClientProfileUseCase } from "../../IUseCases/client-profile/IUpdateClientProfileUseCase";
import { ClientProfileMapper } from "../../mapper/ClientProfileMapper";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { validateAge } from "../../utils/validation.util";
import { BadRequestError } from "../../errors/AppError";

export class UpdateClientProfileUseCase implements IUpdateClientProfileUseCase {
    constructor(private clientRepository: IClientRepository) { }

    async execute(clientId: string, data: UpdateClientProfileRequestDTO): Promise<ClientProfileDTO> {
        const client = await this.clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundError("Client");
        }

        if (data.dateOfBirth) {
            const ageValidation = validateAge(data.dateOfBirth);
            if (!ageValidation.isValid) {
                throw new BadRequestError(ageValidation.message);
            }
        }

        const clientDataUpdate = {
            fullName: data.fullName ?? client.fullName,
            phoneNumber: data.phoneNumber ?? client.phoneNumber ?? '',
            emergencyContact: data.emergencyContact ?? client.emergencyContact ?? '',
            contactPerson: data.contactPerson ?? client.contactPerson ?? '',
            dateOfBirth: data.dateOfBirth ?? (client.dateOfBirth ? client.dateOfBirth.toISOString() : ''),
        };

        const updatedClient = await this.clientRepository.updateClientByGym(clientId, clientDataUpdate);
        return ClientProfileMapper.toDTO(updatedClient);
    }
}
