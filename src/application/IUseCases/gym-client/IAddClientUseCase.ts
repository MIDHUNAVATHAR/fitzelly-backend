import { AddClientRequestDTO } from "../../dtos/gym-client/ClientDTO";

export interface IAddClientUseCase {
    execute(clientDate: AddClientRequestDTO): Promise<void>;
}