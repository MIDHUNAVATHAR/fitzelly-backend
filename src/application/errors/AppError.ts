import { HttpStatus } from "../../constants/statusCodes.constants";

export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number = HttpStatus.BAD_REQUEST) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class InvalidOtpError extends AppError {
    constructor(message: string = "Invalid OTP") {
        super(message,HttpStatus.BAD_REQUEST)
    }
}

export class AuthenticationFailedError extends AppError {
    constructor(message: string = "Invalid email or password") {
        super(message, HttpStatus.UNAUTHORIZED)
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = "Access denied") {
        super(message, HttpStatus.FORBIDDEN)
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} not found`, HttpStatus.NOT_FOUND)
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Resource already exists") {
        super(message, HttpStatus.CONFLICT)
    }
}

export class ServiceUnavailableError extends AppError {
    constructor(message: string = "service is temporarily unavailable") {
        super(message, HttpStatus.SERVICE_UNAVAILABLE)
    }
}

