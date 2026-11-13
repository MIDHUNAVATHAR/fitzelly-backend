import { GetClientResponseDTO } from "../dtos/ClientDTO";

export interface IGetClientByIdUseCase {
    execute(clientId: string): Promise<GetClientResponseDTO>;
}