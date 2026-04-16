import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { ForbiddenError, NotFoundError } from "../../errors/AppError";
import { IDeleteClientUseCase } from "../../IUseCases/gym-client/IDeleteClientUseCase";


export class DeleteClientUseCase implements IDeleteClientUseCase {
    constructor(
        private _clientRepository: IClientRepository
    ) { }

    async execute(clientId: string, gymId: string): Promise<void> {
        const client = await this._clientRepository.findById(clientId);
        if (client?.gymId !== gymId) {
            throw new ForbiddenError();
        }
        if (!client) {
            throw new NotFoundError("Client not found");
        }
        await this._clientRepository.softDelete(clientId);
    }
}