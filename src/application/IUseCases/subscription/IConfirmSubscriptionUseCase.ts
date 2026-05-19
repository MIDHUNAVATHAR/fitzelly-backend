export interface IConfirmSubscriptionUseCase {
    execute(sessionId: string): Promise<void>;
}
