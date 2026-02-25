import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { NotFoundError } from "../../errors/AppError";
import { IDeleteClientUseCase } from "../../IUseCases/client/IDeleteClientUseCase";


export class DeleteClientUseCase implements IDeleteClientUseCase {
    constructor(
        private _clientRepository: IClientRepository
    ) { }

    async execute(clientId: string): Promise<void> {
        const client = await this._clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundError("Client not found");
        }
        await this._clientRepository.softDelete(clientId)
    }
}