import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/services/JwtService";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { ResponseMessage } from "../../constants/response.constants";
import { SessionRepository } from "../../infrastructure/repositories/SessionRepository";
import { JwtPayload } from "../../domain/services/ITokenService";

const jwtService = new JwtService();
const sessionRepository = new SessionRepository();

export interface AuthRequest extends Request {
    user?: JwtPayload
}

export const protect = (roles: string[]) => async (req: AuthRequest, res: Response, next: NextFunction) => {
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

        // Check session validity
        if (payload.sessionId) {
            const isActive = await sessionRepository.isSessionActive(payload.sessionId);
            if (!isActive) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    status: ResponseStatus.FAIL,
                    message: "Session expired or revoked"
                })
            }
        }

        if (roles.length > 0 && !roles.includes(payload.role)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: ResponseStatus.FAIL,
                message: ResponseMessage.NOT_ALLOWED_TO_ACCESS
            })
        }

        req.user = payload;
        next();

    } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: ResponseStatus.ERROR,
            message: ResponseMessage.ACCESS_TOKEN_INVALID
        })
    }
}