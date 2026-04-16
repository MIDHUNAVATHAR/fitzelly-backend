export class ServiceUnavailableError extends Error {
    constructor(serviceName: string) {
        super(`${serviceName} is currently unavailable`);
        this.name = "ServiceUnavailableError";
    }
}
