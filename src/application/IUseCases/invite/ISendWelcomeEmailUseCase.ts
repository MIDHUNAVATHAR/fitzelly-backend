
export interface ISendWelcomeEmailUseCase {
    execute(userId:string,email: string, name: string, gymId: string, urlPrefix: string): Promise<void>;
}
