import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/services/JwtService";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { ResponseMessage } from "../../constants/response.constants";


const jwtService = new JwtService();

export interface AuthRequest extends Request {
    user?: { id: string, role: string, email: string }
}

export const protect = (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                status: ResponseStatus.FAIL,
                message: ResponseMessage.ACCESS_TOKEN_MISSING
            })
        }

        const token = authHeader.split(" ")[1];
        const payload = jwtService.verifyAccessToken(token);

        if (roles.length > 0 && !roles.includes(payload.role)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: ResponseStatus.FAIL,
                message: ResponseMessage.NOT_ALLOWED_TO_ACCESS
            })
        }

        req.user = payload;
        next();

    } catch {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: ResponseStatus.ERROR,
            message: ResponseMessage.ACCESS_TOKEN_INVALID
        })
    }
}