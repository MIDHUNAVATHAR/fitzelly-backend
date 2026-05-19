export interface ICreateCheckoutSessionInput {
    planId: string;
    gymId: string;
    gymEmail: string;
}

export interface ICheckoutSessionResult {
    sessionId: string;
    url: string | null;
}

export interface ICreateCheckoutSessionUseCase {
    execute(input: ICreateCheckoutSessionInput): Promise<ICheckoutSessionResult>;
}
