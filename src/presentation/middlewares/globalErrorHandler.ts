import { NextFunction, Request, Response } from "express";
import { AppError } from "../../application/errors/AppError";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { logger } from "../../infrastructure/logger/logger";
import { ResponseMessage } from "../../constants/response.constants";
import { DomainError } from "../../domain/errors/DomainError";


export function globalErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
    logger.error("Error : ", err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: ResponseStatus.ERROR,
            message: err.message,
        })
    }

    if (err instanceof DomainError) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: ResponseStatus.ERROR,
            message: err.message
        })
    }

    /**
     * unknown errors in db/services
     */
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.ERROR,
        message: ResponseMessage.UNKNOWN_ERROR_MESSAGE
    })

}