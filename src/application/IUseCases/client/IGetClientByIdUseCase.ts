import { GetClientResponseDTO } from "../../dtos/ClientDTO";

export interface IGetClientByIdUseCase {
    execute(clientId: string, gymId: string): Promise<GetClientResponseDTO>;
}