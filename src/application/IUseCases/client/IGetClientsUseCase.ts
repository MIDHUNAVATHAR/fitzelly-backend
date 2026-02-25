import { GetClientResponseDTO } from "../../dtos/ClientDTO";

export interface IGetClientsUseCase {
    execute(gymId: string, page: number, search?: string): Promise<{
        clients: GetClientResponseDTO[],
        total: number;
        page: number;
        limit: number;
    }>;
}