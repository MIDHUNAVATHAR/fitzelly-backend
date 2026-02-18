export class ExternalAuthFailedError extends Error {
    constructor(provider: string, reason?: string) {
        super(`${provider} authentication failed: ${reason}`);
        this.name = "ExternalAuthFailedError";
    }
}
