export class InvalidTokenError extends Error {
    constructor(type: "access" | "refresh") {
        super(`Invalid or expired ${type} token`);
        this.name = "InvalidTokenError";
    }
}
