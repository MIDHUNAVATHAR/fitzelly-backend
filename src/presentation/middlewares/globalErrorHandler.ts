import { Request, Response } from "express";
import { AppError } from "../../application/errors/AppError";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { logger } from "../../infrastructure/logger/logger";


export function globalErrorHandler(err: Error, req: Request, res: Response) {
    logger.error("Error : ", err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: ResponseStatus.ERROR,
            message: err.message,
        })
    }

    //unknown errors like db/service operations fail 
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.ERROR,
        message: "something went wrong. please try again later"
    })

}