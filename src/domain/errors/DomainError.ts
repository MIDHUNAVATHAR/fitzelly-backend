export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class EmailNotVerifiedError extends DomainError {
    constructor(email: string) {
        super(`Email not verified: ${email}`);
    }
}

export class ClientDeletedError extends DomainError {
    constructor() {
        super(`Client account is deleted`);
    }
}

export class TrainerDeletedError extends DomainError {
    constructor() {
        super(`Trainer account is deleted`);
    }
}