import { Client } from "../../../domain/entities/Client";

export interface IGetAssignedClientsUseCase {
    execute(trainerId: string, page: number, search?: string): Promise<{
        clients: Client[];
        total: number;
        page: number;
        limit: number;
    }>;
}
