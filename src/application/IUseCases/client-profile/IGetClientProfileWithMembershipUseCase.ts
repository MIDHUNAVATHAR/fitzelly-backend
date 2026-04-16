import { ClientProfileWithMembershipResponseDTO } from "../../dtos/gym-client/ClientProfileWithMembershipDTO";

export interface IGetClientProfileWithMembershipUseCase {
    execute(clientId: string): Promise<ClientProfileWithMembershipResponseDTO>;
}
