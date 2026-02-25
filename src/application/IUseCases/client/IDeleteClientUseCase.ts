export interface IDeleteClientUseCase {
    execute(clientId: string): Promise<void>;
}