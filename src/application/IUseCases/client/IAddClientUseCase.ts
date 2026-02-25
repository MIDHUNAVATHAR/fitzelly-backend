import { AddClientRequestDTO } from "../../dtos/ClientDTO";

export interface IAddClientUseCase {
    execute(clientDate: AddClientRequestDTO): Promise<void>;
}