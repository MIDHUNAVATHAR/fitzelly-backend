import { GetClientResponseDTO } from "../../dtos/gym-client/ClientDTO";
import { IGetClientsUseCase } from "../../IUseCases/gym-client/IGetClientsUseCase";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { ClientMapper } from "../../mapper/ClientMapper";

import { Membership } from "../../../domain/entities/Membership";

export class GetClientsUseCase implements IGetClientsUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _membershipRepository: IMembershipRepository
    ) { }

    async execute(gymId: string, page: number, limit: number, search?: string): Promise<{
        clients: GetClientResponseDTO[];
        total: number;
        page: number;
        limit: number;
    }> {


        const skip = (page - 1) * limit;

        const { clients, total } = await this._clientRepository.getClientsByGymId(gymId, skip, limit, search);

        const clientIds = clients.map(c => c.id!);
        let memberships: Membership[] = [];

        if (clientIds.length > 0 && this._membershipRepository.findLatestByClientIds) {
            memberships = await this._membershipRepository.findLatestByClientIds(clientIds);
        }

        const membershipMap = new Map(memberships.map(m => [m.clientId, m]));

        const result = clients.map(client => {
            const membership = membershipMap.get(client.id);
            const currentPlan = membership ? membership.planName || null : null;
            const membershipStatus = membership ? membership.status : null;
            return ClientMapper.toGetClientResponseDTO(client, {
                currentPlan,
                membershipStatus
            });
        });
        return {
            clients: result,
            total,
            page,
            limit
        }
    }
}