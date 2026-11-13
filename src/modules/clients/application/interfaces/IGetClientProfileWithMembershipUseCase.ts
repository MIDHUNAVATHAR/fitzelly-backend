import { ClientProfileWithMembershipResponseDTO } from "../dtos/ClientProfileWithMembershipDTO";

export interface IGetClientProfileWithMembershipUseCase {
    execute(clientId: string): Promise<ClientProfileWithMembershipResponseDTO>;
}
