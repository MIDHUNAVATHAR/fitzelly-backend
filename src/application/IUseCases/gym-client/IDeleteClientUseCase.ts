export interface IDeleteClientUseCase {
    execute(clientId: string, gymId: string): Promise<void>;
}