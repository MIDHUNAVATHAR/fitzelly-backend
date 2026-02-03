import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = schema.parse(req.body)
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "All fields must be between 3 and 30 characters.",
                errors: error.issues,
            })
        }
        next(error)
    }
}
