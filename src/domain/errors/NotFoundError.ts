
export class NotFoundError extends Error {
    constructor(entity: string) {
        super(`${entity} was not found`);
        this.name = "Not found Error"
    }
}
