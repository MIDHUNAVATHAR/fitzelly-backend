import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { AddClientRequestDTO } from "../../dtos/gym-client/ClientDTO";
import { IAddClientUseCase } from "../../IUseCases/gym-client/IAddClientUseCase";
import { ConflictError } from "../../errors/AppError";
import { ClientMapper } from "../../mapper/ClientMapper";

export class AddClientUseCase implements IAddClientUseCase {
    constructor(
        private _clientRepository: IClientRepository
    ) { }

    async execute(clientDate: AddClientRequestDTO): Promise<void> {
        const { email } = clientDate;

        const verifiedClient = await this._clientRepository.findVerifiedByEmail(email);

        if (verifiedClient) {
            throw new ConflictError("Client with this email is already exists");
        }

        const clientEntity = ClientMapper.toAddClientEntity(clientDate);
        await this._clientRepository.create(clientEntity);
    }
}