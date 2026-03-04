import { GetClientResponseDTO } from "../../dtos/gym-client/ClientDTO";

export interface IGetClientByIdUseCase {
    execute(clientId: string): Promise<GetClientResponseDTO>;
}