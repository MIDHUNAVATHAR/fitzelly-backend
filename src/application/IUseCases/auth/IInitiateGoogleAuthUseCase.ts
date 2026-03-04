export interface IInitiateGoogleAuthUseCase {
    execute(role: string, mode: string): string;
}