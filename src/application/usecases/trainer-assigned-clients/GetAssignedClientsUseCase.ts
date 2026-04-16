import { IGetAssignedClientsUseCase } from "../../IUseCases/trainer-assinged-clients/IGetAssignedClientsUseCase";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { Client } from "../../../domain/entities/Client";

export class GetAssignedClientsUseCase implements IGetAssignedClientsUseCase {
    constructor(private _clientRepository: IClientRepository) { }

    async execute(trainerId: string, page: number, search?: string): Promise<{
        clients: Client[];
        total: number;
        page: number;
        limit: number;
    }> {
        const limit = 5;
        const skip = (page - 1) * limit;

        const { clients, total } = await this._clientRepository.getClientsByTrainerId(trainerId, skip, limit, search);

        return {
            clients,
            total,
            page,
            limit
        };
    }
}
